"use client";

import { Suspense, useActionState, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { updatePassword, type AuthActionState } from "../actions";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const initialState: AuthActionState = {};

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const [state, formAction, isPending] = useActionState(
    updatePassword,
    initialState,
  );
  const code = searchParams.get("code");
  const [sessionError, setSessionError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    async function establishSession() {
      // Two recovery link formats depending on the Supabase project's auth
      // flow setting: PKCE sends ?code=..., the implicit flow sends
      // #access_token=...&type=recovery in the URL fragment. The fragment
      // case is handled automatically by the browser client's
      // detectSessionInUrl on init, but only once the client is actually
      // instantiated — which is why we always create it here rather than
      // only when a `code` param is present.
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          setSessionError(error.message);
          setReady(true);
          return;
        }
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setSessionError(
          "This reset link is invalid or has expired. Request a new one from the login page.",
        );
      }
      setReady(true);
    }

    void establishSession();
  }, [code]);

  if (sessionError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{sessionError}</AlertDescription>
      </Alert>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {state.error && (
        <Alert variant="destructive">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        <Label htmlFor="password">New password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
        />
        <p className="text-xs text-muted-foreground">At least 8 characters.</p>
      </div>
      <Button type="submit" className="w-full" disabled={isPending || !ready}>
        {isPending ? "Updating..." : "Update password"}
      </Button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Choose a new password</CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={null}>
          <ResetPasswordForm />
        </Suspense>
      </CardContent>
    </Card>
  );
}

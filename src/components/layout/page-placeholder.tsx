import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export function PagePlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Sparkles className="size-4 text-accent" />
          <CardTitle className="text-base font-normal text-muted-foreground">
            Coming soon
          </CardTitle>
          <Badge variant="secondary" className="ml-auto">
            In development
          </Badge>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          We&apos;re actively building this feature. Check back soon for updates.
        </CardContent>
      </Card>
    </div>
  );
}

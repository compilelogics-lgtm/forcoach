import Link from "next/link";
import Image from "next/image";

export function MarketingFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
        <div className="flex items-center gap-2">
          <Image
            src="/brand/logo-icon-charcoal.png"
            alt="FORCOACH"
            width={22}
            height={22}
          />
          <div>
            <div className="font-heading text-sm font-semibold">FORCOACH</div>
            <div className="text-xs text-muted-foreground">
              Manage. Grow. Inspire.
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/login" className="hover:text-foreground">
            Log in
          </Link>
          <Link href="/register" className="hover:text-foreground">
            Get Started
          </Link>
        </div>
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} FORCOACH. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function MarketingNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/brand/logo-icon-charcoal.png"
            alt="FORCOACH"
            width={28}
            height={28}
          />
          <span className="font-heading text-base font-semibold tracking-wide">
            FORCOACH
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground sm:flex">
          <a href="#features" className="hover:text-foreground">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-foreground">
            How it works
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" render={<Link href="/login">Log in</Link>} />
          <Button render={<Link href="/register">Get Started</Link>} />
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";
import {
  CalendarDays,
  Clock,
  Building2,
  FileText,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { DashboardMock } from "@/components/marketing/dashboard-mock";
import { EarningsMock } from "@/components/marketing/earnings-mock";

const FEATURES = [
  {
    icon: CalendarDays,
    title: "Unified calendar",
    description:
      "Connect your Google Calendar or upload a CSV, and see every class from every studio in one place.",
  },
  {
    icon: Clock,
    title: "Automatic hours tracking",
    description:
      "Every class you teach is timed and totaled automatically — daily, weekly, monthly, and per studio.",
  },
  {
    icon: Building2,
    title: "Multi-studio compensation",
    description:
      "Set an hourly or per-class rate for each studio you work with, and your earnings calculate themselves.",
  },
  {
    icon: FileText,
    title: "One-click invoices",
    description:
      "Generate a branded, professional invoice for any studio and billing period, ready to send.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Add your studios",
    description: "Enter the studios you coach at and how each one pays you.",
  },
  {
    number: "02",
    title: "Import your schedule",
    description: "Connect Google Calendar or upload a CSV of your classes.",
  },
  {
    number: "03",
    title: "Track earnings automatically",
    description: "Hours and income update themselves as your schedule changes.",
  },
  {
    number: "04",
    title: "Generate invoices",
    description: "Pick a studio and date range, and download a ready invoice.",
  },
];

const AUDIENCE = ["Pilates", "Lagree", "Yoga", "Personal Training"];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MarketingNav />

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-4 pt-16 pb-14 text-center sm:px-6 sm:pt-24">
          <Badge variant="secondary" className="mb-6">
            Built for independent fitness coaches
          </Badge>
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            The operating system for fitness coaches to manage their business
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Track your classes across every studio, calculate your earnings
            automatically, and generate professional invoices — so you can
            focus on coaching, not paperwork.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              render={
                <Link href="/register">
                  Get Started
                  <ArrowRight className="size-4" />
                </Link>
              }
            />
          </div>
        </section>

        {/* Dashboard mock */}
        <section className="px-4 pb-20 sm:px-6">
          <DashboardMock />
        </section>

        {/* Problem framing */}
        <section className="border-y border-border bg-secondary/40 px-4 py-10 sm:px-6">
          <p className="mx-auto max-w-2xl text-center text-base font-medium text-foreground/80 sm:text-lg">
            You teach at three studios, use three different apps, and still
            do your invoicing in a spreadsheet at the end of the month.
          </p>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-semibold">
              Everything your coaching business needs
            </h2>
            <p className="mt-3 text-muted-foreground">
              One place for your schedule, your hours, your earnings, and
              your invoices.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <feature.icon className="size-5 text-accent" />
                  <CardTitle className="mt-2 text-base">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {feature.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="border-y border-border bg-secondary/40 px-4 py-20 sm:px-6"
        >
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-semibold">
              How it works
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <div key={step.number}>
                <div className="font-heading text-sm font-semibold text-accent">
                  {step.number}
                </div>
                <h3 className="mt-2 font-heading text-base font-semibold">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bigger product preview */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-semibold">
              See your numbers, not just your schedule
            </h2>
            <p className="mt-3 text-muted-foreground">
              A real financial snapshot of your coaching business, updated
              automatically as you teach.
            </p>
          </div>
          <div className="mt-12">
            <EarningsMock />
          </div>
        </section>

        {/* Audience */}
        <section className="border-y border-border px-4 py-14 sm:px-6">
          <p className="text-center text-sm font-medium text-muted-foreground">
            Built for
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {AUDIENCE.map((tag) => (
              <Badge key={tag} variant="outline" className="px-4 py-1.5 text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-primary px-4 py-20 text-primary-foreground sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-semibold">
              Ready to stop doing the math yourself?
            </h2>
            <p className="mt-3 text-primary-foreground/70">
              Set up your studios in a few minutes and let FORCOACH handle
              the rest.
            </p>
            <div className="mt-8 flex justify-center">
              <Button
                size="lg"
                variant="secondary"
                render={
                  <Link href="/register">
                    Get Started
                    <ArrowRight className="size-4" />
                  </Link>
                }
              />
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}

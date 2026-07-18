import Link from "next/link";
import {
  CalendarDays,
  Clock,
  Building2,
  FileText,
  ArrowRight,
  X,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MarketingNav } from "@/components/marketing/marketing-nav";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { DashboardMock } from "@/components/marketing/dashboard-mock";
import { EarningsMock } from "@/components/marketing/earnings-mock";
import { StudiosMock } from "@/components/marketing/studios-mock";

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

const WITHOUT = [
  "A different app or spreadsheet for every studio you teach at",
  "Manually adding up hours from memory or scattered calendars",
  "Guessing your monthly income until you sit down and calculate it",
  "Building each invoice from scratch, studio by studio",
];

const WITH = [
  "One account, every studio, one unified schedule",
  "Hours tracked and totaled automatically as classes happen",
  "Real-time earnings, broken down by studio and month",
  "A branded invoice generated in one click, ready to send",
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

const AUDIENCE = [
  {
    tag: "Pilates",
    description: "Reformer, mat, and tower classes across multiple studios.",
  },
  {
    tag: "Lagree",
    description: "High-intensity megaformer sessions, tracked studio by studio.",
  },
  {
    tag: "Yoga",
    description: "Vinyasa, hatha, or hot yoga — every class, every location.",
  },
  {
    tag: "Personal Training",
    description: "One-on-one and small group sessions across your client base.",
  },
];

const FAQ = [
  {
    question: "Do I need a separate account for each studio?",
    answer:
      "No. One FORCOACH account holds all of your studios, each with its own compensation rate, in one place.",
  },
  {
    question: "What if two studios pay me differently?",
    answer:
      "Each studio has its own rate — hourly or per-class — so your earnings calculate correctly no matter how each one pays you.",
  },
  {
    question: "Can I import my existing schedule?",
    answer:
      "Yes. You'll be able to connect Google Calendar directly or upload a CSV export of your classes.",
  },
  {
    question: "Is my data private?",
    answer:
      "Yes. Your schedules, studios, and earnings are only ever visible to you.",
  },
  {
    question: "What does it cost?",
    answer:
      "FORCOACH is currently in early access. Reach out after signing up and we'll walk you through it.",
  },
];

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
          <div className="mt-8 flex flex-col items-center gap-3">
            <Button
              size="lg"
              render={
                <Link href="/register">
                  Get Started
                  <ArrowRight className="size-4" />
                </Link>
              }
            />
            <p className="text-xs text-muted-foreground">
              Free during early access — no credit card required.
            </p>
          </div>
        </section>

        {/* Dashboard mock */}
        <section className="px-4 pb-20 sm:px-6">
          <DashboardMock />
        </section>

        {/* Without / With comparison */}
        <section className="border-y border-border bg-secondary/40 px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-semibold">
              You didn&apos;t become a coach to do spreadsheets
            </h2>
            <p className="mt-3 text-muted-foreground">
              Coaching across multiple studios shouldn&apos;t mean juggling
              multiple systems.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-background p-6">
              <div className="font-heading text-sm font-semibold text-muted-foreground">
                Without FORCOACH
              </div>
              <ul className="mt-4 space-y-3">
                {WITHOUT.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <X className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-accent/30 bg-background p-6">
              <div className="font-heading text-sm font-semibold text-accent">
                With FORCOACH
              </div>
              <ul className="mt-4 space-y-3">
                {WITH.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
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

        {/* Studio management detail row */}
        <section className="border-y border-border bg-secondary/40 px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-heading text-3xl font-semibold">
                Manage every studio in one place
              </h2>
              <p className="mt-4 text-muted-foreground">
                Add each studio you coach at with its own contact details and
                pay rate. Mixing hourly studios and per-class studios is
                normal — FORCOACH handles both without extra setup.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-start gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                  Hourly or per-class rates, set individually
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                  Mark a studio inactive without losing its history
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                  Contact info, notes, and reference IDs all in one card
                </li>
              </ul>
            </div>
            <StudiosMock />
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="px-4 py-20 sm:px-6">
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

        {/* Earnings detail row */}
        <section className="border-y border-border bg-secondary/40 px-4 py-20 sm:px-6">
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
        <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-semibold">
              Built for coaches like you
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {AUDIENCE.map((item) => (
              <div
                key={item.tag}
                className="rounded-xl border border-border p-5"
              >
                <Badge variant="outline" className="mb-2">
                  {item.tag}
                </Badge>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="border-y border-border bg-secondary/40 px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-center font-heading text-3xl font-semibold">
              Frequently asked questions
            </h2>
            <Accordion className="mt-10 w-full">
              {FAQ.map((item) => (
                <AccordionItem key={item.question} value={item.question}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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

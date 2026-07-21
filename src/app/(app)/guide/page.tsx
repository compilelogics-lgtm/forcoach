import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type GuideSection = {
  id: string;
  question: string;
  status?: "available" | "soon";
  content: React.ReactNode;
};

const SECTIONS: GuideSection[] = [
  {
    id: "getting-started",
    question: "Getting started",
    status: "available",
    content: (
      <div className="space-y-2">
        <p>
          FORCOACH centralizes your coaching schedule, tracks your hours and
          earnings across every studio you work with, and generates
          professional invoices — no spreadsheets required.
        </p>
        <p>
          Start by adding the studios you coach at (with their pay rate),
          then as scheduling and invoicing features roll out, you&apos;ll be
          able to import your classes and generate invoices directly from
          the same data.
        </p>
      </div>
    ),
  },
  {
    id: "studios",
    question: "Managing studios",
    status: "available",
    content: (
      <div className="space-y-2">
        <p>
          Go to <strong>Studios</strong> and click <strong>Add studio</strong>{" "}
          to create one. Each studio needs a name and a compensation rate —
          either an <strong>hourly rate</strong> or a{" "}
          <strong>per-class rate</strong>, whichever matches how that studio
          pays you.
        </p>
        <p>
          Optional fields (contact person, email, phone, address, reference
          ID, notes) help you keep everything in one place, but only the name
          and rate are required.
        </p>
        <p>
          If you stop coaching somewhere but want to keep its history, set
          its status to <strong>Inactive</strong> instead of deleting it —
          inactive studios are hidden from new scheduling but keep all their
          past records. Use <strong>Edit</strong> or <strong>Delete</strong>{" "}
          on any studio card to make changes.
        </p>
      </div>
    ),
  },
  {
    id: "profile",
    question: "Your profile and account",
    status: "available",
    content: (
      <div className="space-y-2">
        <p>
          Under <strong>Settings</strong>, you can update your full name,
          time zone, and currency preference (currency is EUR-only for now).
        </p>
        <p>
          Under the <strong>Account</strong> section on the same page, you
          can change your password at any time without needing to log out
          first.
        </p>
      </div>
    ),
  },
  {
    id: "calendar",
    question: "Calendar & schedule imports",
    status: "available",
    content: (
      <div className="space-y-2">
        <p>
          Go to <strong>Calendar</strong> to bring in your classes: connect
          your <strong>Google Calendar</strong> for automatic syncing, or{" "}
          <strong>Import CSV</strong> for a one-off upload — either way,
          you&apos;ll see a preview before anything is added.
        </p>
        <p>
          Switch between <strong>List</strong>, <strong>Month</strong>,{" "}
          <strong>Week</strong>, and <strong>Day</strong> views, and filter by
          studio or search by title. Each event can be assigned to a studio,
          edited, excluded from earnings, or deleted.
        </p>
      </div>
    ),
  },
  {
    id: "earnings",
    question: "Earnings",
    status: "soon",
    content: (
      <p>
        Once schedules are imported, your hours and earnings will calculate
        automatically per studio, per day/week/month — no manual math.
      </p>
    ),
  },
  {
    id: "invoices",
    question: "Invoices",
    status: "soon",
    content: (
      <p>
        Generate a branded, professional PDF invoice for any studio and
        billing period directly from your tracked hours and rate — ready to
        send, no re-entering numbers.
      </p>
    ),
  },
  {
    id: "support",
    question: "Need more help?",
    content: (
      <p>
        This guide will keep growing alongside the product. If something
        isn&apos;t covered here, reach out to your FORCOACH contact and
        we&apos;ll help directly.
      </p>
    ),
  },
];

export default function GuidePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">User Guide</h1>
        <p className="text-muted-foreground mt-1">
          Everything you need to know to get the most out of FORCOACH.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-normal text-muted-foreground">
            Frequently asked questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion className="w-full">
            {SECTIONS.map((section) => (
              <AccordionItem key={section.id} value={section.id}>
                <AccordionTrigger className="text-left">
                  <span className="flex items-center gap-2">
                    {section.question}
                    {section.status === "soon" && (
                      <Badge variant="outline" className="font-normal">
                        Coming soon
                      </Badge>
                    )}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {section.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}

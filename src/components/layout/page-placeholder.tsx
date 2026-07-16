import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        <CardHeader>
          <CardTitle className="text-base text-muted-foreground font-normal">
            Coming in a later chunk
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          This section is scaffolded but not yet implemented.
        </CardContent>
      </Card>
    </div>
  );
}

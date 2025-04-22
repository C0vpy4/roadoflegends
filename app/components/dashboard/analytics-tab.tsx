import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

export function AnalyticsTab() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Detailed Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Detailed analytics will be available soon.
        </p>
      </CardContent>
    </Card>
  );
}

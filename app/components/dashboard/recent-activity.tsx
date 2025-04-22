import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

export function RecentActivity() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Your recent activity will appear here. Start exploring to see your
          history.
        </p>
      </CardContent>
    </Card>
  );
}

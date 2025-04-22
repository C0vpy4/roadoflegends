import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

export function SettingsTab() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Dashboard Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Configure your dashboard preferences here.
        </p>
      </CardContent>
    </Card>
  );
}

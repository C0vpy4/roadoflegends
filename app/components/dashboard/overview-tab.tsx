import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VisitStats } from "@/types/dashboard";
import { RecentActivity } from "./recent-activity";

interface OverviewTabProps {
  visitStats: VisitStats;
}

export function OverviewTab({ visitStats }: OverviewTabProps) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Visits"
          value={visitStats.totalVisits}
          description="All time page visits"
        />

        <StatCard
          title="Unique Visitors"
          value={visitStats.uniqueVisitors}
          description="Distinct users who visited"
        />

        <StatCard
          title="Today's Visits"
          value={visitStats.todayVisits}
          description="Visits in the last 24 hours"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <RecentActivity />
      </div>
    </>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  description: string;
}

function StatCard({ title, value, description }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

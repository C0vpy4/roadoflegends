"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { DashboardTabs } from "@/components/dashboard/tabs";
import { VisitStats } from "@/types/dashboard";
import { DashboardHeader } from "../components/dashboard/Header";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [visitStats, setVisitStats] = useState<VisitStats>({
    totalVisits: 0,
    uniqueVisitors: 0,
    todayVisits: 0,
  });
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/auth");
        return;
      }

      await recordVisit(session.user.id);
      await fetchVisitStats();
      setLoading(false);
    };

    checkAuth();
  }, [router, supabase]);

  const recordVisit = async (userId: string) => {
    try {
      const { error } = await supabase.from("visits").insert({
        user_id: userId,
        visited_at: new Date().toISOString(),
        page: "/dashboard",
        user_agent: navigator.userAgent,
      });

      if (error) {
        console.error("Error recording visit:", error);
      }
    } catch (err) {
      console.error("Failed to record visit:", err);
    }
  };

  const fetchVisitStats = async () => {
    try {
      // Получаем общее количество посещений
      const { count: totalVisits, error: totalError } = await supabase
        .from("visits")
        .select("*", { count: "exact", head: true });

      // Получаем количество уникальных посетителей
      const { data: uniqueData, error: uniqueError } = await supabase
        .from("visits")
        .select("user_id")
        .order("user_id")
        .is("user_id", null, { not: true });

      // Получаем количество посещений за сегодня
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const { count: todayVisits, error: todayError } = await supabase
        .from("visits")
        .select("*", { count: "exact", head: true })
        .gte("visited_at", today.toISOString());

      if (totalError || uniqueError || todayError) {
        console.error(
          "Error fetching visit stats:",
          totalError || uniqueError || todayError
        );
      } else {
        // Получаем уникальные user_id
        const uniqueVisitors = uniqueData
          ? [...new Set(uniqueData.map((item) => item.user_id))].length
          : 0;

        setVisitStats({
          totalVisits: totalVisits || 0,
          uniqueVisitors,
          todayVisits: todayVisits || 0,
        });
      }
    } catch (err) {
      console.error("Failed to fetch visit stats:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <DashboardHeader />
      <DashboardTabs visitStats={visitStats} />
    </div>
  );
}

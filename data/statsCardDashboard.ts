import { StatCardAdmin } from "@/types";
import { TFunction } from "i18next";
import { Clock, Mail, MessageSquare, TrendingUp } from "lucide-react";

export const statCards = (stats: any, t: TFunction): StatCardAdmin[] => [
  {
    id: 1,
    title: t("dashboardPage.statstotal"),
    value: stats.total,
    icon: MessageSquare,
    linear: "from-teal-500 to-teal-600",
  },
  {
    id: 2,

    title: t("dashboardPage.statsunread"),
    value: stats.unread,
    icon: Mail,
    linear: "from-amber-500 to-orange-600",
  },
  {
    id: 3,
    title: t("dashboardPage.statstoday"),
    value: stats.today,
    icon: Clock,
    linear: "from-emerald-500 to-teal-600",
  },
  {
    id: 4,

    title: t("dashboardPage.statslastWeek"),
    value: stats.lastWeek,
    icon: TrendingUp,
    linear: "from-violet-500 to-purple-600",
  },
];

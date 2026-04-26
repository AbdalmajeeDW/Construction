// components/dashboard/QuickOverview.tsx
import { Activity, Eye, Mail, Clock, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { Message } from "@/types";

interface QuickOverviewProps {
  messages: Message[];
  t: (key: string) => string;
}

export default function QuickOverview({ messages, t }: QuickOverviewProps) {
  const totalMessages = messages.length;
  const readMessages = messages.filter((msg) => msg.isRead).length;
  const readRate = totalMessages > 0 ? Math.round((readMessages / totalMessages) * 100) : 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayMessages = messages.filter((msg) => new Date(msg.createdAt) >= today).length;
  const todayRate = totalMessages > 0 ? Math.round((todayMessages / totalMessages) * 100) : 0;
  return (
    <div className="grid lg:grid-cols-1 gap-4 sm:gap-6 mb-6 sm:mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-linear-to-br from-teal-600 to-teal-700 rounded-xl sm:rounded-2xl shadow-lg overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16" />
        <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-24 sm:h-24 bg-white/10 rounded-full -ml-10 sm:-ml-12 -mb-10 sm:-mb-12" />
        <div className="relative p-4 sm:p-6">
          <div className="mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
          <h3 className="text-white text-xl sm:text-2xl font-bold mb-1">
            {t("quickOverviewAdmin.quickOverview")}
          </h3>
          <p className="text-teal-100 text-xs sm:text-sm mb-3 sm:mb-4">
            {t("quickOverviewAdmin.messageEngagementStats")}
          </p>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-teal-100 text-xs sm:text-sm">
                {t("quickOverviewAdmin.readRate")}
              </span>
              <span className="text-white font-semibold text-sm sm:text-base">
                {readRate}%
              </span>
            </div>
            <div className="w-full bg-teal-800 rounded-full h-1.5 sm:h-2">
              <div 
                className="bg-white rounded-full h-1.5 sm:h-2 transition-all duration-1000" 
                style={{ width: `${readRate}%` }}
              />
            </div>
            
            <div className="flex justify-between items-center mt-2 sm:mt-3">
              <span className="text-teal-100 text-xs sm:text-sm">
                {t("quickOverviewAdmin.todayActivity")}
              </span>
              <span className="text-white font-semibold text-sm sm:text-base">
                {todayRate}%
              </span>
            </div>
            <div className="w-full bg-teal-800 rounded-full h-1.5 sm:h-2">
              <div 
                className="bg-white rounded-full h-1.5 sm:h-2 transition-all duration-1000" 
                style={{ width: `${todayRate}%` }}
              />
            </div>
          </div>
        </div>
      </motion.div>

    
    </div>
  );
}
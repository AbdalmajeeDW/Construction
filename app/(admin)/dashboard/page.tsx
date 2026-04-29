"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MessageSquare, ArrowUpRight, LogOut, Loader2 } from "lucide-react";
import Link from "next/link";
import { statCards } from "@/data/statsCardDashboard";
import StatCard from "@/components/dashboard/StatCard";
import QuickOverview from "@/components/dashboard/QuickOverview";
import Header from "@/components/dashboard/Header";
import { Message, Stats } from "@/types";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { API_ENDPOINTS } from "@/endPoint";
import {  getRoute } from "@/helper/getFilter";

const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);
     const response = await api.get(API_ENDPOINTS.CONTACT.GET_ALL);
      setMessages(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setError(
        error instanceof Error ? error.message : "Failed to load messages",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return { messages, loading, error, refetch: fetchMessages };
};

const calculateStats = (messages: Message[]): Stats => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);

  return {
    total: messages.length,
    unread: messages.filter((msg) => !msg.isRead).length,
    today: messages.filter((msg) => new Date(msg.createdAt) >= today).length,
    lastWeek: messages.filter((msg) => new Date(msg.createdAt) >= lastWeek)
      .length,
  };
};

const MessageItem = ({ message }: { message: Message }) => {
  const { t } = useTranslation();
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
      <Link
        href={`/singleMessage/${message.id}`}
        className="block px-4 sm:px-6 py-3 sm:py-4 hover:bg-linear-to-r hover:from-teal-50/50 hover:to-transparent transition-all duration-300"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
            {!message.isRead && (
              <div className="relative shrink-0 mt-1 sm:mt-0">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-teal-600 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-teal-600 rounded-full animate-ping opacity-75" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                  {message.firstName + " " + message.lastName}
                </p>
                {!message.isRead && (
                  <span className="text-[10px] sm:text-xs bg-teal-100 text-teal-700 px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap">
                    {t("dashboardPage.messagesnew")}
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-xs sm:text-sm truncate">
                {message.email}
              </p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1 line-clamp-2 sm:line-clamp-1">
                {message.message}
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right ml-6 sm:ml-4 shrink-0">
            <p className="text-gray-500 text-xs sm:text-sm whitespace-nowrap">
              {new Date(message.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
            <p className="text-gray-400 text-[10px] sm:text-xs mt-0.5 sm:mt-1">
              {new Date(message.createdAt).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function AdminDashboard() {
  const router = useRouter();
  const { messages, loading, error } = useMessages();
  const stats = calculateStats(messages);
  const { t } = useTranslation();

  const dataStats = statCards(stats, t);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <p className="text-red-600 mb-4 text-sm sm:text-base">
            {t("dashboardPage.commonerror")}: {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm sm:text-base"
          >
            {t("dashboardPage.messagesretry")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 -left-4 w-48 h-48 sm:w-72 sm:h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-48 h-48 sm:w-72 sm:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-48 h-48 sm:w-72 sm:h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <Header
        title={t("dashboardPage.title")}
       
      />

      <div className=" mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
       {dataStats.map((card) => (
  <StatCard
    key={card.id}
    {...card}
     onClick={() => router.push(getRoute(card.id))}

  />
))}
        </div>
        <QuickOverview messages={messages} t={t} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
        >
          <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <div>
              <h2 className="font-bold text-gray-800 text-base sm:text-lg">
                {t("dashboardPage.messagestitle")}
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm">
                {t("dashboardPage.messagessubtitle")}
              </p>
            </div>
            <Link
              href="/messages"
              className="text-teal-600 text-xs sm:text-sm hover:text-teal-700 font-medium flex items-center gap-1 group"
            >
              {t("dashboardPage.messagesviewAll")}

              <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {loading ? (
              <div className="p-8 sm:p-12 text-center">
                <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 text-teal-600 animate-spin mx-auto" />
                <p className="text-gray-500 text-sm sm:text-base mt-2 sm:mt-3">
                  {t("dashboardPage.messagesloading")}
                </p>
              </div>
            ) : messages.length === 0 ? (
              <div className="p-8 sm:p-12 text-center">
                <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2 sm:mb-3" />
                <p className="text-gray-500 text-sm sm:text-base">
                  {t("dashboardPage.messagesnoMessages")}
                </p>
              </div>
            ) : (
              messages
                .slice(0, 5)
                .map((message) => (
                  <MessageItem key={message.id} message={message} />
                ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

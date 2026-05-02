"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle, Search, Inbox, RefreshCw } from "lucide-react";
import Header from "@/components/dashboard/Header";
import Table from "@/components/dashboard/Table";
import { Message } from "@/types";
import { useTranslation } from "react-i18next";
import Pagination from "@/components/dashboard/Pagination";
import ConfirmDialog from "@/components/dashboard/ConfirmDialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import api from "@/api";
import { API_ENDPOINTS } from "@/endPoint";

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "read" | "unread">("unread");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const f = searchParams.get("filter");
    if (f === "read" || f === "unread" || f === "all") {
      setFilter(f);
    }
  }, [searchParams]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await api.get(API_ENDPOINTS.CONTACT.GET_ALL);
      setMessages(Array.isArray(response.data) ? response.data : []);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id: any) => {
    try {
      await api.delete(API_ENDPOINTS.CONTACT.GET_BY_ID(id));
      setMessages(messages.filter((msg) => msg.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = (id: string) => {
    
    setMessageToDelete(id);
    setDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (messageToDelete) {
      deleteMessage(messageToDelete);
      setMessageToDelete(null);
    }
  };

  const handleFilterByAll = () => {
    setFilter("all");
    setCurrentPage(1);
    router.push(`/messages?filter=all`);
  };

  const handleFilterByUnread = () => {
    setFilter("unread");
    setCurrentPage(1);
    router.push(`/messages?filter=unread`);
  };

  const handleFilterByRead = () => {
    setFilter("read");
    setCurrentPage(1);
    router.push(`/messages?filter=read`);
  };

  const filteredMessages = messages
    .filter((msg) => {
      if (filter === "read") return msg.isRead;
      if (filter === "unread") return !msg.isRead;
      return true;
    })
    .filter(
      (msg) =>
        msg.firstName?.toLowerCase().includes(search.toLowerCase()) ||
        msg.email?.toLowerCase().includes(search.toLowerCase()) ||
        msg.message?.toLowerCase().includes(search.toLowerCase())
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const unreadCount = messages.filter((m) => !m.isRead).length;
  const readCount = messages.filter((m) => m.isRead).length;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50">
      <Header
        title={t("messagePage.messages")}
        titleButton={t("messagePage.refresh")}
        buttonIcon={<RefreshCw className="w-5 h-5" />}
        click={fetchMessages}
      />

      <div className="mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleFilterByAll}
            className={`bg-white rounded-2xl shadow-sm border p-6 transition-all duration-300 cursor-pointer ${
              filter === "all"
                ? "border-teal-500 shadow-lg ring-2 ring-teal-500/20"
                : "border-gray-100 hover:shadow-md hover:border-teal-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold text-gray-800">
                {messages.length}
              </span>
            </div>
            <h3 className="text-gray-600 font-medium mt-4">
              {t("messagePage.totalMessages")}
            </h3>
            <p className="text-gray-400 text-sm">
              {t("messagePage.allTimeSubmissions")}
            </p>
          
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleFilterByUnread}
            className={`bg-white rounded-2xl shadow-sm border p-6 transition-all duration-300 cursor-pointer ${
              filter === "unread"
                ? "border-amber-500 shadow-lg ring-2 ring-amber-500/20"
                : "border-gray-100 hover:shadow-md hover:border-amber-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Inbox className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold text-amber-600">
                {unreadCount}
              </span>
            </div>
            <h3 className="text-gray-600 font-medium mt-4">
              {t("messagePage.unreadMessages")}
            </h3>
            <p className="text-gray-400 text-sm">
              {t("messagePage.awaitingResponse")}
            </p>
          
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleFilterByRead}
            className={`bg-white rounded-2xl shadow-sm border p-6 transition-all duration-300 cursor-pointer ${
              filter === "read"
                ? "border-emerald-500 shadow-lg ring-2 ring-emerald-500/20"
                : "border-gray-100 hover:shadow-md hover:border-emerald-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold text-gray-800">
                {readCount}
              </span>
            </div>
            <h3 className="text-gray-600 font-medium mt-4">
              {t("messagePage.readMessages")}
            </h3>
            <p className="text-gray-400 text-sm">
              {t("messagePage.alreadyReviewed")}
            </p>
         
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={t("messagePage.searchPlaceholder")}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="placeholder:text-gray-400 text-black/75 w-full pl-11 pr-4 py-2.5 border border-gray-500 rounded-xl focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
              />
            </div>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => {
                  setFilter("all");
                  setCurrentPage(1);
                  router.push("/messages?filter=all");
                }}
                className={`px-5 py-2.5 cursor-pointer rounded-xl font-medium transition-all duration-300 ${
                  filter === "all"
                    ? "bg-linear-to-r from-teal-600 to-teal-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t("messagePage.all")}
              </button>
              <button
                onClick={() => {
                  setFilter("unread");
                  setCurrentPage(1);
                  router.push("/messages?filter=unread");
                }}
                className={`px-5 py-2.5 cursor-pointer rounded-xl font-medium transition-all duration-300 ${
                  filter === "unread"
                    ? "bg-linear-to-r from-amber-600 to-orange-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t("messagePage.unread")}
              </button>
              <button
                onClick={() => {
                  setFilter("read");
                  setCurrentPage(1);
                  router.push("/messages?filter=read");
                }}
                className={`px-5 py-2.5 cursor-pointer rounded-xl font-medium transition-all duration-300 ${
                  filter === "read"
                    ? "bg-linear-to-r from-emerald-600 to-teal-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t("messagePage.read")}
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <Table
            currentPage={currentPage}
            deleteMessage={handleDeleteClick}
            filteredMessages={filteredMessages}
            loading={loading}
          />
          <ConfirmDialog
            isOpen={dialogOpen}
            onClose={() => setDialogOpen(false)}
            onConfirm={handleConfirmDelete}
            title={t("confirmDialog.title")}
            message={t("confirmDialog.message")}
            confirmText={t("confirmDialog.confirmText")}
            cancelText={t("confirmDialog.cancelText")}
            type="danger"
          />
          {totalPages > 1 && !loading && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              totalItems={filteredMessages.length}
              t={t}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
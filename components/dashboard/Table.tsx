import { AnimatePresence } from "framer-motion";
import { CheckCircle, Eye, Inbox, Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";
import { Message } from "@/types";
import { useTranslation } from "react-i18next";

interface TableMessages {
  filteredMessages: Message[];
  currentPage: number;
  loading: boolean;
  deleteMessage: (id: string) => void;
}

export default function Table({
  currentPage,
  deleteMessage,
  filteredMessages,
  loading,
}: TableMessages) {
  const itemsPerPage = 10;
  const router = useRouter();
  const { t } = useTranslation();

  const paginatedMessages = filteredMessages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="text-left px-6 py-4 text-gray-600 font-semibold text-sm w-24">
              {t("messagePage.status")}
            </th>
            <th className="text-left px-6 py-4 text-gray-600 font-semibold text-sm w-32">
              {t("messagePage.name")}
            </th>
            <th className="text-left px-6 py-4 text-gray-600 font-semibold text-sm w-48">
              {t("messagePage.email")}
            </th>
            <th className="text-left px-6 py-4 text-gray-600 font-semibold text-sm">
              {t("messagePage.message")}
            </th>
            <th className="text-left px-6 py-4 text-gray-600 font-semibold text-sm w-36">
              {t("messagePage.date")}
            </th>
            <th className="text-left px-6 py-4 text-gray-600 font-semibold text-sm w-28">
              {t("messagePage.actions")}
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr >
              <td colSpan={6} className="text-center py-16">
                <div className="inline-flex flex-col items-center gap-3">
                  <Loader2 className="w-10 h-10 text-teal-600 animate-spin" />
                  <p className="text-gray-500 text-sm">
                    {" "}
                    {t("messagePage.loading")}
                  </p>
                </div>
              </td>
            </tr>
          ) : paginatedMessages.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-16">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
                    <Inbox className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">
                    {t("messagePage.noMessages")}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {t("messagePage.tryAdjustingFilters")}
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            <AnimatePresence>
              {paginatedMessages.map((msg, idx) => (
                <motion.tr
                  key={msg.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b cursor-pointer border-gray-50 hover:bg-linear-to-r hover:from-teal-50/30 hover:to-transparent transition-all duration-300 group"
                  onClick={() => router.push(`singleMessage/${msg.id}`)}
                >
                  <td className="px-6 py-4">
                    {!msg.isRead ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-full whitespace-nowrap">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                        {t("messagePage.new")}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full whitespace-nowrap">
                        <CheckCircle className="w-3 h-3" />
                        {t("messagePage.read")}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p
                      className="font-semibold text-gray-800 truncate max-w-[150px]"
                      title={msg.firstName + msg.lastName}
                    >
                      {msg.firstName + msg.lastName}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p
                      className="text-gray-600 text-sm truncate max-w-[200px]"
                      title={msg.email}
                    >
                      {msg.email}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p
                      className="text-gray-500 text-sm line-clamp-2 max-w-md"
                      title={msg.message}
                    >
                      {msg.message}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-gray-500 text-sm">
                      {new Date(msg.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {new Date(msg.createdAt).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1">
                      <button
                        onClick={() => router.push(`singleMessage/${msg.id}`)}
                        className="p-2 cursor-pointer text-teal-600 hover:bg-teal-50 rounded-lg transition-all duration-200"
                        title={t("messagePage.view")}
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => deleteMessage(msg.id)}
                        className="p-2 cursor-pointer text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                        title={t("messagePage.delete")}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          )}
        </tbody>
      </table>
    </div>
  );
}

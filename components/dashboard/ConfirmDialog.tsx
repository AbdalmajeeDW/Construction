"use client";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "info";
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  type = "danger",
}: ConfirmDialogProps) {
  const colors = {
    danger: {
      bg: "bg-red-50",
      border: "border-red-200",
      icon: "text-red-600",
      button: "bg-red-600 hover:bg-red-700",
      ring: "ring-red-600",
    },
    warning: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      icon: "text-amber-600",
      button: "bg-amber-600 hover:bg-amber-700",
      ring: "ring-amber-600",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: "text-blue-600",
      button: "bg-blue-600 hover:bg-blue-700",
      ring: "ring-blue-600",
    },
  };

  const colorStyle = colors[type];

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md"
          >
            <div className={`${colorStyle.bg} rounded-xl sm:rounded-2xl shadow-xl border ${colorStyle.border} overflow-hidden`}>
              <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${colorStyle.bg} ${colorStyle.icon}`}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                    {title}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-4 sm:p-5">
                <p className="text-gray-600 text-sm sm:text-base">{message}</p>
              </div>
              
              <div className="flex justify-end gap-3 p-4 sm:p-5 bg-gray-50/50">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 text-sm font-medium hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {cancelText}
                </button>
                <button
                  onClick={handleConfirm}
                  className={`px-4 py-2 ${colorStyle.button} text-white text-sm font-medium rounded-lg transition-all hover:shadow-md focus:ring-2 focus:ring-offset-2 ${colorStyle.ring}`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Send,
  CheckCircle,
  AlertCircle,
  User,
  Mail,
  MessageSquare,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ContactForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/contact/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        const error = await response.json();
        setErrorMessage(error.message || "حدث خطأ، حاول مرة أخرى");
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (error) {
      setErrorMessage("فشل الاتصال بالخادم");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section
      ref={ref}
      className="py-24 px-4 bg-linear-to-b from-white to-slate-50"
    >
      <div className="px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            {t("contactForm.title")}
            <span className="text-teal-600">
              {" "}
              {t("contactForm.titleHighlight")}
            </span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            {t("contactForm.description")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="bg-teal-600 px-8 py-6 text-center">
              <h3 className="text-2xl font-bold text-white">
                {t("contactForm.formTitle")}
              </h3>
              <p className="text-teal-100 mt-2">
                {t("contactForm.formSubtitle")}
              </p>
            </div>

            <div className="p-8 md:p-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                    <User className="w-4 h-4 text-teal-600" />
                    {t("contactForm.nameLabel")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-200 transition-all"
                    placeholder={t("contactForm.namePlaceholder")}
                  />
                </div>

                <div className="group">
                  <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                    <Mail className="w-4 h-4 text-teal-600" />
                    {t("contactForm.emailLabel")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-200 transition-all"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div className="group">
                <label className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
                  <MessageSquare className="w-4 h-4 text-teal-600" />
                  {t("contactForm.messageLabel")}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-200 transition-all resize-none"
                  placeholder="اكتب رسالتك هنا..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-teal-600 text-white py-3.5 rounded-xl font-semibold hover:bg-teal-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg text-lg mt-6"
              >
                {status === "loading" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t("contactForm.buttonSending")}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t("contactForm.buttonSend")}
                  </>
                )}
              </button>

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 bg-green-50 text-green-700 rounded-xl"
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span>تم إرسال رسالتك بنجاح! سنتواصل معك قريباً</span>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-xl"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

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
  MapPin,
  Hash,
  ImageIcon,
  X,
  Upload,
  Phone,
  Ruler,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { API_ENDPOINTS } from "@/endPoint";

export default function ContactForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    houseNumber: "",
    space: "",
    message: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "space") {
      if (/^\d*\.?\d*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (images.length + files.length > 5) {
      setErrorMsg(t("errorMaxImages"));
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    const validFiles = files.filter((f) => f.size <= 5 * 1024 * 1024);
    setImages([...images, ...validFiles]);
    setPreviews([
      ...previews,
      ...validFiles.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setImages(images.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (images.length < 2) {
      setErrorMsg(t("errorImages"));
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    const spaceNum = parseFloat(formData.space);
    if (isNaN(spaceNum) || spaceNum <= 0) {
      setErrorMsg(t("errorSpace"));
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    setStatus("loading");

    const fd = new FormData();

    Object.entries(formData).forEach(([key, val]) => {
      if (val) fd.append(key, val);
    });

    fd.append("status", "pending");
    fd.append("isRead", "false");

    images.forEach((img) => fd.append("images", img));

    try {
      const response = await api.post(API_ENDPOINTS.CONTACT.CREATE, fd, {});

      if (response.status === 200 || response.status === 201) {
        setStatus("success");

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          location: "",
          houseNumber: "",
          space: "",
          message: "",
        });

        previews.forEach((p) => URL.revokeObjectURL(p));
        setImages([]);
        setPreviews([]);

        setTimeout(() => setStatus("idle"), 3000);
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);

      if (error.response) {
        const errorMessage = error.response.data?.message || t("error");
        setErrorMsg(errorMessage);
      } else if (error.request) {
        setErrorMsg(t("networkError"));
      } else {
        setErrorMsg(t("error"));
      }

      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section ref={ref} className="py-16  bg-gray-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8  ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-800">
            {t("contactForm.title")}{" "}
            <span className="text-teal-600">
              {t("contactForm.titleHighlight")}
            </span>
          </h2>
          <p className="text-gray-500 mt-2">{t("contactForm.description")}</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-1">
                <User size={16} /> {t("contactForm.firstName")}
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="text-black/75 placeholder:text-gray-400
                w-full shadow-xs px-4 py-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-1">
                <User size={16} /> {t("contactForm.lastName")}
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="  text-black/75   placeholder:text-gray-400
                w-full shadow-xs border-gray-500 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-1">
                <Mail size={16} /> {t("contactForm.email")}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className=" text-black/75                 placeholder:text-gray-400
w-full px-4 border-gray-500 shadow-xs py-2 border rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-1">
                <Phone size={16} /> {t("contactForm.phone")}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="   text-black/75 placeholder:text-gray-400
                  w-full shadow-xs border-gray-500 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-1">
                <MapPin size={16} /> {t("contactForm.location")}
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="  text-black/75                placeholder:text-gray-400
w-full shadow-xs border-gray-500 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-1">
                <Hash size={16} /> {t("contactForm.houseNumber")}
              </label>
              <input
                type="text"
                name="houseNumber"
                value={formData.houseNumber}
                onChange={handleChange}
                required
                className="text-black/75  placeholder:text-gray-400
                w-full shadow-xs border-gray-500 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-1">
              <Ruler size={16} /> {t("contactForm.space")}
            </label>
            <input
              type="number"
              name="space"
              value={formData.space}
              onChange={handleChange}
              required
              className="text-black/75 placeholder:text-gray-400
              w-full shadow-xs border-gray-500 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-1">
              <MessageSquare size={16} /> {t("contactForm.message")}
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              placeholder={t("contactForm.messagePlaceholder")}
              className="text-black/75 placeholder:text-gray-400
              w-full border-gray-500 shadow-xs px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400 outline-none resize-none"
            />
          </div>

          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-1">
              <ImageIcon size={16} /> {t("contactForm.images")}
            </label>
            <p className="text-xs text-gray-500 mb-2">
              {t("contactForm.imagesHint")}
            </p>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-teal-400"
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Upload size={24} className="mx-auto text-gray-400 mb-1" />
              <p className="text-sm text-gray-500">{t("uploadText")}</p>
              <p className="text-xs text-gray-400 mt-1">
                {t("contactForm.uploadHint")}
              </p>
            </div>

            {previews.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-3">
                {previews.map((src, i) => (
                  <div key={i} className="relative">
                    <img
                      src={src}
                      className="w-full h-20 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {status === "loading" ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t("contactForm.sending")}
              </>
            ) : (
              <>
                <Send size={18} /> {t("contactForm.submit")}
              </>
            )}
          </button>

          {status === "success" && (
            <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg mt-4 text-sm">
              <CheckCircle size={18} /> {t("contactForm.success")}
            </div>
          )}
          {status === "error" && (
            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg mt-4 text-sm">
              <AlertCircle size={18} /> {errorMsg}
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
}

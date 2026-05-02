"use client";

import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { motion, useInView } from "framer-motion";
import {
  Send,
  User,
  Mail,
  MessageSquare,
  MapPin,
  Hash,
  X,
  Upload,
  Phone,
  Ruler,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import api from "@/api";
import { API_ENDPOINTS } from "@/endPoint";
import { validateFormContact } from "@/lib/validation";
import { InputField } from "./InputField";
import { FormErrors } from "@/types";
import imageCompression from "browser-image-compression";
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  postcode: string;
  nr: string;
  straat: string;
  plaats: string;
  space: string;
  message: string;
}

export default function ContactForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useTranslation();

  const inputClass =
    "text-black/75 placeholder:text-gray-400 w-full border border-gray-400 px-4 py-2 rounded-lg focus:ring-2 focus:ring-teal-400 outline-none";
  const inputErrorClass =
    "text-black/75 placeholder:text-gray-400 w-full border border-red-500 px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-400 outline-none";

  const labelClass =
    "flex items-center gap-2 text-sm font-semibold text-gray-600 mb-1";

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    postcode: "",
    nr: "",
    straat: "",
    plaats: "",
    space: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    const invalidFiles: string[] = [];

    const compressImage = async (file: File) => {
      const imageCompression = (await import("browser-image-compression"))
        .default;

      const beforeSizeMB = file.size / 1024 / 1024;

      const options = {
        maxSizeMB: 0.4,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      const compressed = await imageCompression(file, options);

      const afterSizeMB = compressed.size / 1024 / 1024;

      console.log(
        `🖼️ ${file.name} | Before: ${beforeSizeMB.toFixed(2)}MB → After: ${afterSizeMB.toFixed(2)}MB`,
      );

      return compressed;
    };

   const results: (File | null)[] = [];

for (const file of files) {
  if (!file.type.startsWith("image/")) {
    invalidFiles.push(`${file.name} (${t("validation.imagesType")})`);
    results.push(null);
    continue;
  }

  const compressed = await compressImage(file);
  results.push(compressed);
}

    const validFiles: File[] = results.filter(
      (file): file is File => file !== null,
    );

    if (invalidFiles.length > 0) {
      setErrors((prev) => ({
        ...prev,
        images: t("validation.imagesInvalid", {
          files: invalidFiles.join(", "),
        }),
      }));
      return;
    }

    setImages((prev) => [...prev, ...validFiles]);

    setPreviews((prev) => [
      ...prev,
      ...validFiles.map((f) => URL.createObjectURL(f)),
    ]);

    if (errors.images) {
      setErrors((prev) => ({ ...prev, images: undefined }));
    }
  };

  const removeImage = (i: number) => {
    URL.revokeObjectURL(previews[i]);
    setImages((prev) => prev.filter((_, idx) => idx !== i));
    setPreviews((prev) => prev.filter((_, idx) => idx !== i));
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      postcode: "",
      nr: "",
      straat: "",
      plaats: "",
      space: "",
      message: "",
    });
    setImages([]);
    setPreviews([]);
    setErrors({});
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (status === "loading") return;

    const { isValid, errors: validationErrors } = validateFormContact(
      formData,
      t,
      images,
    );

    if (!isValid) {
      setErrors(validationErrors);
      setErrorMsg(t("validation.formErrors"));
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    const fd = new FormData();

    Object.entries(formData).forEach(([k, v]) => {
      fd.append(k, v ?? "");
    });

    images.forEach((img) => fd.append("images", img));

    fd.append("isRead", "false");
    fd.append("status", "pending");

    try {
      const res = await api.post(API_ENDPOINTS.CONTACT.CREATE, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200 || res.status === 201) {
        setStatus("success");
        resetForm();

        setTimeout(() => {
          setStatus("idle");
          setErrorMsg("");
        }, 3000);
      }
    } catch (err) {
      console.error("Submit error:", err);
      setErrorMsg(t("validation.submitError"));
      setStatus("error");
    }
  };
  return (
    <section ref={ref} className="py-16 bg-gray-50">
      <div className="mx-auto px-4 lg:px-8">
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
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg"
          noValidate
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <InputField
              label="firstName"
              icon={<User size={16} />}
              errorName="firstName"
              errors={errors}
              formData={formData}
              t={t}
              onChange={handleChange}
            />
            <InputField
              label="lastName"
              icon={<User size={16} />}
              errorName="lastName"
              errors={errors}
              formData={formData}
              t={t}
              onChange={handleChange}
            />
            <InputField
              label="email"
              icon={<Mail size={16} />}
              errorName="email"
              errors={errors}
              formData={formData}
              t={t}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <InputField
              label="phone"
              icon={<Phone size={16} />}
              errorName="phone"
              errors={errors}
              formData={formData}
              t={t}
              onChange={handleChange}
            />
            <InputField
              label="postcode"
              icon={<MapPin size={16} />}
              errorName="postcode"
              errors={errors}
              formData={formData}
              t={t}
              onChange={handleChange}
            />
            <InputField
              label="plaats"
              icon={<MapPin size={16} />}
              errorName="plaats"
              errors={errors}
              formData={formData}
              t={t}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-4">
            <div className="sm:col-span-6">
              <InputField
                label="straat"
                icon={<MapPin size={16} />}
                errorName="straat"
                errors={errors}
                formData={formData}
                t={t}
                onChange={handleChange}
              />
            </div>
            <div className="sm:col-span-2">
              <InputField
                label="nr"
                icon={<Hash size={16} />}
                errorName="nr"
                errors={errors}
                formData={formData}
                t={t}
                onChange={handleChange}
              />
            </div>
            <div className="sm:col-span-4">
              <InputField
                label="space"
                icon={<Ruler size={16} />}
                errorName="space"
                errors={errors}
                formData={formData}
                t={t}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className={labelClass}>
              <MessageSquare size={16} /> {t("contactForm.message")} *
            </label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              className={errors.message ? inputErrorClass : inputClass}
              onChange={handleChange}
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
          </div>

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border border-dashed border-teal-600 p-4 text-teal-600 rounded-lg text-center cursor-pointer mb-4 hover:bg-teal-50 transition"
          >
            <input
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
            <Upload className="mx-auto" />
            <span className="text-sm">{t("contactForm.uploadText")}</span>
          </div>
          {errors.images && (
            <p className="text-red-500 text-xs mb-2">{errors.images}</p>
          )}

          {previews.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-4">
              {previews.map((p, i) => (
                <div key={i} className="relative group">
                  <img
                    src={p}
                    className="h-20 w-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 transition"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition disabled:opacity-50"
          >
            {status === "loading" ? (
              <span className="inline-flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t("contactForm.sending")}
              </span>
            ) : (
              <>
                <Send className="inline mr-2" /> {t("contactForm.submit")}
              </>
            )}
          </button>

          {status === "success" && (
            <p className="text-green-600 mt-2 text-center font-semibold">
              ✓ {t("contactForm.success")}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}

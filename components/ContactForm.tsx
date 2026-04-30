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

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  postcode?: string;
  nr?: string;
  straat?: string;
  plaats?: string;
  space?: string;
  message?: string;
  images?: string;
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
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((p) => ({ ...p, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    const validFiles: File[] = [];
    const invalidFiles: string[] = [];
    
    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        invalidFiles.push(`${file.name} (${t("validation.imagesType")})`);
      } else {
        validFiles.push(file);
      }
    }
    
    if (invalidFiles.length > 0) {
      setErrors((prev) => ({ 
        ...prev, 
        images: t("validation.imagesInvalid", { files: invalidFiles.join(", ") })
      }));
      return;
    }

    setImages((p) => [...p, ...validFiles]);
    setPreviews((p) => [
      ...p,
      ...validFiles.map((f) => URL.createObjectURL(f)),
    ]);
    
    if (errors.images) {
      setErrors((prev) => ({ ...prev, images: undefined }));
    }
  };

  const removeImage = (i: number) => {
    URL.revokeObjectURL(previews[i]);
    setImages((p) => p.filter((_, idx) => idx !== i));
    setPreviews((p) => p.filter((_, idx) => idx !== i));
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

    const { isValid, errors } = validateFormContact(formData, t,images);
    
    if (!isValid) {
      setErrors(errors);
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
      const res = await api.post(API_ENDPOINTS.CONTACT.CREATE, fd);

      if (res.status === 200 || res.status === 201) {
        setStatus("success");
        resetForm();

        setTimeout(() => setStatus("idle"), 3000);
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (err) {
      console.error("Submit error:", err);
      // setErrorMsg(t("contactForm.validation.submitError"));
      // setStatus("error");
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
            <div>
              <label className={labelClass}><User size={16} /> {t("contactForm.firstName")} *</label>
              <input 
                name="firstName" 
                value={formData.firstName}
                className={errors.firstName ? inputErrorClass : inputClass} 
                onChange={handleChange}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label className={labelClass}><User size={16} /> {t("contactForm.lastName")} *</label>
              <input 
                name="lastName" 
                value={formData.lastName}
                className={errors.lastName ? inputErrorClass : inputClass} 
                onChange={handleChange}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>

            <div>
              <label className={labelClass}><Mail size={16} /> {t("contactForm.email")} *</label>
              <input 
                name="email" 
                type="email"
                value={formData.email}
                className={errors.email ? inputErrorClass : inputClass} 
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className={labelClass}><Phone size={16} /> {t("contactForm.phone")} *</label>
              <input 
                name="phone" 
                type="tel"
                value={formData.phone}
                className={errors.phone ? inputErrorClass : inputClass} 
                onChange={handleChange}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className={labelClass}><MapPin size={16} /> {t("contactForm.postcode")} *</label>
              <input 
                name="postcode" 
                value={formData.postcode}
                className={errors.postcode ? inputErrorClass : inputClass} 
                onChange={handleChange}
              />
              {errors.postcode && <p className="text-red-500 text-xs mt-1">{errors.postcode}</p>}
            </div>

            <div>
              <label className={labelClass}><MapPin size={16} /> {t("contactForm.plaats")} *</label>
              <input 
                name="plaats" 
                value={formData.plaats}
                className={errors.plaats ? inputErrorClass : inputClass} 
                onChange={handleChange}
              />
              {errors.plaats && <p className="text-red-500 text-xs mt-1">{errors.plaats}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-4">
            <div className="sm:col-span-6">
              <label className={labelClass}><MapPin size={16} /> {t("contactForm.straat")} *</label>
              <input 
                name="straat" 
                value={formData.straat}
                className={errors.straat ? inputErrorClass : inputClass} 
                onChange={handleChange}
              />
              {errors.straat && <p className="text-red-500 text-xs mt-1">{errors.straat}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass}><Hash size={16} /> {t("contactForm.nr")} *</label>
              <input 
                name="nr" 
                value={formData.nr}
                className={`${errors.nr ? inputErrorClass : inputClass} text-left sm:text-center`}
                onChange={handleChange}
            
              />
              {errors.nr && <p className="text-red-500 text-xs mt-1">{errors.nr}</p>}
            </div>

            <div className="sm:col-span-4">
              <label className={labelClass}><Ruler size={16} /> {t("contactForm.space")} *</label>
              <input 
                name="space" 
                value={formData.space}
                className={errors.space ? inputErrorClass : inputClass} 
                onChange={handleChange}
                placeholder="m²"
              />
              {errors.space && <p className="text-red-500 text-xs mt-1">{errors.space}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className={labelClass}><MessageSquare size={16} /> {t("contactForm.message")} *</label>
            <textarea 
              name="message" 
              rows={4} 
              value={formData.message}
              className={errors.message ? inputErrorClass : inputClass} 
              onChange={handleChange}
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
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
          {errors.images && <p className="text-red-500 text-xs mb-2">{errors.images}</p>}

          {previews.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-4">
              {previews.map((p, i) => (
                <div key={i} className="relative group">
                  <img src={p} className="h-20 w-full object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1  transition"
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
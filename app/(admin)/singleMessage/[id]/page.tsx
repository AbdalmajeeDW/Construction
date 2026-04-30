"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  MapPin,
  Hash,
  Ruler,
  MessageSquare,
  ImageIcon,
  ArrowLeft,
  Trash2,
  Send,
  ZoomIn,
  Reply,
} from "lucide-react";
import Link from "next/link";
import Header from "@/components/dashboard/Header";
import { useTranslation } from "react-i18next";
import { Message } from "@/types";
import { ImageModal } from "@/components/dashboard/ImageModal";
import api from "@/api";
import { API_ENDPOINTS } from "@/endPoint";
import ConfirmDialog from "@/components/dashboard/ConfirmDialog";

export default function MessageDetail() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = useParams();
  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const API = "http://localhost:3000/contact";
  const API_BASE = "https://rivoaannemerbedrijf.nl/api/";

  useEffect(() => {
    const fetchMessage = async () => {
      if (!id) {
        console.warn("No ID provided");
        setLoading(false);
        return;
      }
      try {
        const response = await api.get(API_ENDPOINTS.CONTACT.GET_BY_ID(id));

        let data = response.data;

        if (data.images && data.images.length > 0) {
          data.images = data.images.map((img: string) =>
            img.startsWith("http") ? img : `${API_BASE}${img}`,
          );
        }
        setMessage(data);
        api.put(API_ENDPOINTS.CONTACT.UPDATE(id), { ...data, read: true });
      } catch (error) {
        console.error("Error fetching message:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMessage();
    }
  }, [id]);
  const deleteMessage = async (id: any) => {
    try {
      api.delete(API_ENDPOINTS.CONTACT.GET_BY_ID(id)).then(() => {
        setMessages(messages.filter((msg) => msg.id !== id));
        router.push("/messages");
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteClick = (id: any) => {
    setMessageToDelete(id);
    setDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (messageToDelete) {
      deleteMessage(messageToDelete);
      setMessageToDelete(null);
    }
  };
  // const handleDelete = async () => {
  //   if (confirm(t("deleteConfirm"))) {
  //     api.delete(API_ENDPOINTS.CONTACT.GET_BY_ID(id)).then(() => {
  //       router.push("/messages");
  //     });
  //   }
  // };

  if (loading) return <LoadingScreen t={t} />;
  if (!message) return <NotFoundScreen t={t} />;

  const fullName = `${message.firstName} ${message.lastName}`;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50">
      <div className="fixed inset-0 -z-10">
        {["teal-300", "purple-300", "pink-300"].map((color, i) => (
          <div
            key={i}
            className={`absolute ${i === 0 ? "top-0 -left-4" : i === 1 ? "top-0 -right-4" : "-bottom-8 left-20"} w-72 h-72 bg-${color} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob`}
            style={{ animationDelay: `${i * 2}s` }}
          />
        ))}
      </div>

      <Header
        title={t("messageDetails.title")}
        titleButton={t("messageDetails.deleteBtn")}
        buttonIcon={<Trash2 className="w-4 h-4" />}
        click={()=>handleDeleteClick(id)}
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
      <div className="container mx-auto px-4 sm:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <InfoCard
              title={t("messageDetails.contactInfo")}
              icon={<User size={18} />}
              items={[
                { label: t("messageDetails.fullName"), value: fullName },
                {
                  label: t("messageDetails.email"),
                  value: message.email,
                  isLink: `mailto:${message.email}`,
                },
                {
                  label: t("messageDetails.phone"),
                  value: message.phone,
                  isLink: `tel:${message.phone}`,
                },
              ]}
            />

            <InfoCard
              title={t("messageDetails.addressInfo")}
              icon={<MapPin size={18} />}
              items={[
                {
                  label: t("contactForm.plaats"),
                  value: message.plaats,
                },
                {
                  label: t("contactForm.nr"),
                  value: message.nr,
                  icon: <Hash size={12} />,
                },
                  {
                  label: t("contactForm.postcode"),
                  value: message.postcode,
                  icon: <Hash size={12} />,
                },
                    {
                  label: t("contactForm.straat"),
                  value: message.straat,
                  icon: <Hash size={12} />,
                },
                {
                  label: t("messageDetails.space"),
                  value: `${message.space} m²`,
                  icon: <Ruler size={12} />,
                },
              ]}
            />

            <ActionCard email={message.email} t={t} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            <MessageCard message={message.message} t={t} />
            {message.images && message.images.length > 0 && (
              <ImagesGrid
                images={message.images}
                onImageClick={(img, idx) => {
                  setSelectedImage(img);
                  setCurrentIndex(idx);
                }}
                t={t}
              />
            )}
          </motion.div>
        </div>
      </div>

      <ImageModal
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        images={message?.images || []}
      />
    </div>
  );
}

const LoadingScreen = ({ t }: { t: any }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-gray-500">{t("messageDetails.loading")}</p>
    </div>
  </div>
);

const NotFoundScreen = ({ t }: { t: any }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <MessageSquare className="w-12 h-12 text-gray-400" />
      </div>
      <p className="text-gray-600 text-lg mb-2">
        {t("messageDetails.notFound")}
      </p>
      <Link
        href="/messages"
        className="inline-flex items-center gap-2 text-teal-600"
      >
        <ArrowLeft className="w-4 h-4" /> {t("messageDetails.back")}
      </Link>
    </div>
  </div>
);

const InfoCard = ({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: {
    label: string;
    value: string;
    isLink?: string;
    icon?: React.ReactNode;
  }[];
}) => (
  <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
    <div className="bg-linear-to-r from-teal-600 to-teal-700 px-6 py-4">
      <h2 className="text-white font-semibold flex items-center gap-2">
        {icon} {title}
      </h2>
    </div>
    <div className="p-6 space-y-4">
      {items.map(
        (item, idx) =>
          item.value && (
            <div key={idx}>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1 flex items-center gap-1">
                {item.icon} {item.label}
              </p>
              {item.isLink ? (
                <a
                  href={item.isLink}
                  className="text-teal-600 hover:underline break-all"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-gray-800 font-medium">{item.value}</p>
              )}
            </div>
          ),
      )}
    </div>
  </div>
);

const ActionCard = ({ email, t }: { email: string; t: any }) => (
  <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
    <div className="bg-linear-to-r from-teal-600 to-teal-700 px-6 py-4">
      <h2 className="text-white font-semibold flex items-center gap-2">
        <Send size={18} /> {t("messageDetails.quickActions")}
      </h2>
    </div>
    <div className="p-6">
      <a
        href={`mailto:${email}?subject=Re: Your message`}
        className="flex items-center justify-center gap-2 w-full py-2.5 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition"
      >
        <Reply size={16} /> {t("messageDetails.replyEmail")}
      </a>
    </div>
  </div>
);

const MessageCard = ({ message, t }: { message: string; t: any }) => (
  <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
    <div className="bg-linear-to-r from-teal-600 to-teal-700 px-6 py-4">
      <h2 className="text-white font-semibold flex items-center gap-2">
        <MessageSquare size={18} /> {t("messageDetails.message")}
      </h2>
    </div>
    <div className="p-6">
      <div className="bg-gray-50 rounded-xl p-6 border">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {message}
        </p>
      </div>
    </div>
  </div>
);

const ImagesGrid = ({
  images,
  onImageClick,
  t,
}: {
  images: string[];
  onImageClick: (img: string, idx: number) => void;
  t: any;
}) => (
  <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
    <div className="bg-linear-to-r from-teal-600 to-teal-700 px-6 py-4">
      <h2 className="text-white font-semibold flex items-center gap-2">
        <ImageIcon size={18} /> {t("messageDetails.images")} ({images.length})
      </h2>
    </div>
    <div className="p-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="relative group cursor-pointer"
            onClick={() => onImageClick(img, idx)}
          >
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-md">
              <img
                src={img}
                alt={`${t("image")} ${idx + 1}`}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-image.png";
                }}
              />
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition rounded-xl flex items-center justify-center">
              <ZoomIn className="w-8 h-8 text-white" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

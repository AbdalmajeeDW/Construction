"use client";

import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  Star,
  ThumbsUp,
  Shield,
  Truck,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import { categories } from "@/data/services";
import Link from "next/link";

export default function ViewService() {
  const params = useParams();
  const router = useRouter();
  const { t } = useTranslation();
  const servicesData = categories(t);
  const service = servicesData.find((e) => e.id === Number(params.id));

  const [activeTab, setActiveTab] = useState<"details" | "process" | "faq">("details");

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center px-4">
          <div className="text-6xl mb-4">🔧</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {t('servicePage.notFound.title')}
          </h2>
          <p className="text-gray-500 mb-6">{t('servicePage.notFound.subtitle')}</p>
          <button
            onClick={() => router.push('/services')}
            className="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('servicePage.notFound.button')}
          </button>
        </div>
      </div>
    );
  }

  const ServiceIcon = service.icon;
  const images = Array.isArray(service.image) ? service.image : [service.image];
  const mainImage = images[0];

  const benefits = [
    { icon: Shield, text: t('servicePage.serviceBenefits.licensed') },
    { icon: ThumbsUp, text: t('servicePage.serviceBenefits.guaranteed') },
    { icon: Clock, text: t('servicePage.serviceBenefits.onTime') },
    { icon: Truck, text: t('servicePage.serviceBenefits.freeConsultation') },
  ];

  const processSteps = [
    { step: "01", title: t('servicePage.process.step1.title'), desc: t('servicePage.process.step1.desc') },
    { step: "02", title: t('servicePage.process.step2.title'), desc: t('servicePage.process.step2.desc') },
    { step: "03", title: t('servicePage.process.step3.title'), desc: t('servicePage.process.step3.desc') },
    { step: "04", title: t('servicePage.process.step4.title'), desc: t('servicePage.process.step4.desc') },
  ];

  const faqItems = t('servicePage.faq', { returnObjects: true }) as Array<{ question: string; answer: string }>;

  return (
    <>
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-4 bg-gradient-to-br from-teal-700 via-teal-600 to-teal-800 py-10">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="relative  px-4 mx-auto">
          <button
            onClick={() => router.push('/services')}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
            <span>{t('servicePage.allServices')}</span>
          </button>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/20 backdrop-blur rounded-full text-white text-sm mb-6">
                <ServiceIcon className="w-4 h-4" />
                <span>{t('servicePage.professionalService')}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {service.name}
              </h1>
              <p className="text-white/80 text-lg mb-6">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5 text-white text-sm">
                    <benefit.icon className="w-3.5 h-3.5" />
                    <span>{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image - Hidden on mobile, visible on lg screens */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={mainImage}
                  alt={service.name}
                  width={600}
                  height={400}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-teal-500 rounded-xl p-4 shadow-lg">
                <div className="text-white text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-xs">{t('servicePage.support247')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-5 bg-gray-50">
        <div className="  px-4 sm:px-6 lg:px-8 mx-auto ">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-10 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("details")}
              className={`flex items-center gap-2 px-6 py-3 rounded-t-lg transition ${
                activeTab === "details"
                  ? "bg-white text-teal-600 border-t border-l border-r border-gray-200"
                  : "text-gray-500 hover:text-teal-600"
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>{t('servicePage.tabs.details')}</span>
            </button>
            <button
              onClick={() => setActiveTab("process")}
              className={`flex items-center gap-2 px-6 py-3 rounded-t-lg transition ${
                activeTab === "process"
                  ? "bg-white text-teal-600 border-t border-l border-r border-gray-200"
                  : "text-gray-500 hover:text-teal-600"
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{t('servicePage.tabs.process')}</span>
            </button>
            <button
              onClick={() => setActiveTab("faq")}
              className={`flex items-center gap-2 px-6 py-3 rounded-t-lg transition ${
                activeTab === "faq"
                  ? "bg-white text-teal-600 border-t border-l border-r border-gray-200"
                  : "text-gray-500 hover:text-teal-600"
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>{t('servicePage.tabs.faq')}</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            {activeTab === "details" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-3 gap-8"
              >
                <div className="md:col-span-2">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('servicePage.details.whatWeOffer')}</h2>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  {service.subServices && service.subServices.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">{t('servicePage.details.ourServicesInclude')}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.subServices.map((sub, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-gray-600">
                            <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0" />
                            <span>{sub}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-800 mb-4">{t('servicePage.details.quickInfo')}</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t('servicePage.details.serviceId')}:</span>
                      <span className="font-medium">#{service.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t('servicePage.details.duration')}:</span>
                      <span className="font-medium">2-5 Days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t('servicePage.details.warranty')}:</span>
                      <span className="font-medium">2 Years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">{t('servicePage.details.experience')}:</span>
                      <span className="font-medium">10+ Years</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-teal-600 mb-3">
                      <Star className="w-4 h-4 fill-teal-600" />
                      <Star className="w-4 h-4 fill-teal-600" />
                      <Star className="w-4 h-4 fill-teal-600" />
                      <Star className="w-4 h-4 fill-teal-600" />
                      <Star className="w-4 h-4 fill-teal-600" />
                      <span className="text-gray-600 ml-2">(150+ {t('servicePage.details.reviews')})</span>
                    </div>
                    <Link
                      href="/contact"
                      className="block w-full text-center bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition"
                    >
                      {t('servicePage.details.requestQuote')}
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "process" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {processSteps.map((item, idx) => (
                  <div key={idx} className="text-center">
                    <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-teal-600">{item.step}</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "faq" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {faqItems.map((item, idx) => (
                  <div key={idx} className="border-b border-gray-100 pb-4">
                    <h3 className="font-semibold text-gray-800 mb-2">{item.question}</h3>
                    <p className="text-gray-500">{item.answer}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-600">
        <div className=" px-4 mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('servicePage.cta.title')}
          </h2>
          <p className="text-teal-100 mb-8">
            {t('servicePage.cta.subtitle')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3 bg-white text-teal-600 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              {t('servicePage.cta.requestQuote')}
            </Link>
            <Link
              href="tel:+31 68 5218315"
              className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              {t('servicePage.cta.callUs')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
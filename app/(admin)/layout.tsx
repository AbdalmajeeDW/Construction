"use client";

import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Mail,
  ChevronRight,
  X,
  Building2,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import I18nProvider from "@/components/I18nProvider";
import { useTranslation } from "react-i18next";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const isLoginPage = pathname === "/login";

  const handleLogout = async () => {
    try {
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("access_token");
      sessionStorage.clear();

      router.push("/login");

      setOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    if (isLoginPage) {
      setIsAuthenticated(true);
      return;
    }

    const token = localStorage.getItem("isAdmin");

    if (!token) {
      router.push("/login");
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [router, isLoginPage]);

  const navItems = [
    {
      href: "/dashboard",
      label: t("navAdmin.dashboard"),
      icon: LayoutDashboard,
    },
    { href: "/messages", label: t("navAdmin.messages"), icon: Mail },
  ];

  if (isAuthenticated === null && !isLoginPage) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">{t("navAdmin.loading")}</p>
        </div>
      </div>
    );
  }

  if (isLoginPage) {
    return <I18nProvider>{children}</I18nProvider>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <I18nProvider>
      <div className="h-screen flex bg-slate-50 overflow-hidden">
        {open && (
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          />
        )}

        <aside
          className={`
            fixed lg:static
            top-0 left-0
            h-full w-64
            bg-linear-to-b from-white via-white to-gray-50/80
            backdrop-blur-sm shadow-2xl
            z-40
            flex flex-col
            transform transition-transform duration-300 ease-in-out
            ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-teal-400/20 to-teal-600/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-0 w-24 h-24 bg-linear-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-2xl"></div>

          <div className="relative px-6 py-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-teal-400 to-teal-600 rounded-xl blur-lg opacity-50"></div>
                <div className="relative bg-linear-to-br from-teal-500 to-teal-600 p-2.5 rounded-xl shadow-lg">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
              </div>

              <div>
                <h1 className="text-xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {t("navAdmin.adminPanel")}
                </h1>
                <p className="text-xs text-gray-400 mt-0.5">
                  {t("navAdmin.controlCenter")}
                </p>
              </div>
            </div>
          </div>

          <nav className="relative flex-1 p-5 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-linear-to-r from-teal-50 to-teal-100/50 text-teal-700 shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {isActive && (
                    <>
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-linear-to-b from-teal-500 to-teal-600 rounded-r-full"></div>
                      <div className="absolute inset-0 bg-linear-to-r from-teal-500/5 to-transparent rounded-xl"></div>
                    </>
                  )}

                  <item.icon
                    className={`w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                      isActive
                        ? "text-teal-600"
                        : "text-gray-500 group-hover:text-teal-600"
                    }`}
                  />

                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="relative p-5 border-t border-gray-100 mt-auto">
            <button
              onClick={handleLogout}
              className="group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 w-full text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" />
              <span className="font-medium">{t("navAdmin.logout")}</span>
            </button>
          </div>
        </aside>

        <main className="flex-1  h-full overflow-y-auto">
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden fixed top-7  z-50 w-6 h-12 bg-white rounded-r-2xl shadow flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            {open ? (
              <X className=" text-black " size={20} />
            ) : (
              <ChevronRight className=" text-black" size={25} />
            )}
          </button>

          {children}
        </main>
      </div>
    </I18nProvider>
  );
}

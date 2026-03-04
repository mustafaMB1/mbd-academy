"use client";

import { useLocale, useTranslations } from "next-intl";
import {
  FaBookOpen,
  FaGlobe,
  FaUsers,
  FaServer,
  FaCode,
  FaMobileAlt,
  FaPaintBrush,
} from "react-icons/fa";
import { MdInstallMobile } from "react-icons/md";

export default function ServicesSection({ id = "services-section" }) {
  const t = useTranslations("Services");
  const locale = useLocale();
  const isAr = locale === "ar";

  const services = [
    {
      key: "education",
      icon: <FaBookOpen className="text-3xl text-white" />,
      title: t("items.education.title"),
      desc: t("items.education.desc"),
    },
    {
      key: "training",
      icon: <MdInstallMobile className="text-3xl text-white" />,
      title: t("items.training.title"),
      desc: t("items.training.desc"),
    },
    {
      key: "community",
      icon: <FaUsers className="text-3xl text-white" />,
      title: t("items.community.title"),
      desc: t("items.community.desc"),
    },
    {
      key: "global",
      icon: <FaGlobe className="text-3xl text-white" />,
      title: t("items.global.title"),
      desc: t("items.global.desc"),
    },
    {
      key: "hosting",
      icon: <FaServer className="text-3xl text-white" />,
      title: t("items.hosting.title"),
      desc: t("items.hosting.desc"),
    },
    {
      key: "webdev",
      icon: <FaCode className="text-3xl text-white" />,
      title: t("items.webdev.title"),
      desc: t("items.webdev.desc"),
    },
    {
      key: "mobile",
      icon: <FaMobileAlt className="text-3xl text-white" />,
      title: t("items.mobile.title"),
      desc: t("items.mobile.desc"),
    },
    {
      key: "design",
      icon: <FaPaintBrush className="text-3xl text-white" />,
      title: t("items.design.title"),
      desc: t("items.design.desc"),
    },
  ];

  return (
    <section
      id={id}
      className="relative overflow-hidden bg-[#070A16] text-white py-16 md:py-20"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.6)_1px,transparent_0)] [background-size:18px_18px]" />
      <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-fuchsia-600/30 via-purple-600/20 to-cyan-400/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            {t("title")}
          </h2>
          <p className="mt-3 mx-auto max-w-2xl text-white/70">
            {t("subtitle")}
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((srv, idx) => (
            <div
              key={srv.key}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 hover:bg-white/[0.06] transition"
            >
              <div className="relative flex items-center justify-center">
                <div className="h-14 w-14 rounded-2xl grid place-items-center ring-1 ring-white/10 bg-gradient-to-br from-fuchsia-500/45 via-purple-500/30 to-cyan-400/30 shadow-[0_0_28px_rgba(217,70,239,0.18)]">
                  {srv.icon}
                </div>
              </div>

              <h3 className="mt-5 text-lg font-extrabold text-white">
                {srv.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {srv.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
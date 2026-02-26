"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import aboutImage from "../../../assest/logo.jpg";
import { FaBookOpen, FaGlobe, FaUsers } from "react-icons/fa";
import { MdInstallMobile } from "react-icons/md";



export default function AboutPage() {
  const t = useTranslations("About");

  const services = [
    {
      id: 1,
      icon: <FaBookOpen className="text-3xl  text-[var(--main-color)]" />,
      title: t("services.education.title"),
      desc: t("services.education.desc"),
    },
    {
      id: 2,
      icon: <MdInstallMobile className="text-3xl text-[var(--main-color)]" />,
      title: t("services.training.title"),
      desc: t("services.training.desc"),
    },
    {
      id: 3,
      icon: <FaUsers className="text-3xl text-[var(--main-color)]" />,
      title: t("services.community.title"),
      desc: t("services.community.desc"),
    },
    {
      id: 4,
      icon: <FaGlobe className="text-3xl text-[var(--main-color)]" />,
      title: t("services.global.title"),
      desc: t("services.global.desc"),
    },
  ];

  return (
    <section className="bg-white md:mt-[166px] text-gray-800">
      {/* ===== القسم الأول: عن الأكاديمية ===== */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 py-20 px-6">
        {/* الصورة */}
        <div className="w-full md:w-1/2 relative rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={aboutImage}
            alt="About our academy"
            className="object-cover w-full h-[400px]"
          />
        </div>

        {/* النص */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {t("description1")}
          </p>
          <p className="text-gray-600 leading-relaxed">
            {t("description2")}
          </p>
        </div>
      </div>

      {/* ===== القسم الثاني: خدماتنا ===== */}
      <div className="bg-[var(--secondary-color-2)]/5 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t("services.title")}
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-center mb-4">{srv.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  {srv.title}
                </h3>
                <p className="text-gray-600 text-sm">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

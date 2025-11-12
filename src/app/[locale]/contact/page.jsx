"use client";
import { useTranslations } from "next-intl";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaTelegram,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";
import Image from "next/image";
import img from "../../../assest/AU-blog-teaching-strategies-_Help-with-Online-Learning.jpg";

export default function ContactPage() {
  const t = useTranslations("Contact");

  return (
    <section className="bg-gray-50 md:mt-[166px] min-h-screen flex flex-col items-center justify-center py-16 px-4 sm:px-8">
      {/* HEADER */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {t("title")}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          {t("subtitle")}
        </p>
        <div className="mt-6 w-20 h-1 bg-[var(--main-color)] mx-auto rounded-full"></div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* LEFT SIDE — IMAGE */}
        <div className="relative w-full h-[260px] sm:h-[320px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg order-2 md:order-1">
          <Image
            src={img}
            alt="Global reach"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center p-4 sm:p-6">
            <h3 className="text-xl sm:text-2xl font-semibold mb-2">
              {t("globalTitle")}
            </h3>
            <p className="text-sm sm:text-base max-w-md">{t("globalText")}</p>
          </div>
        </div>

        {/* RIGHT SIDE — CONTACT DETAILS */}
        <div className="order-1 md:order-2">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {t("connectTitle")}
            </h3>

            <ul className="space-y-4 sm:space-y-5">
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-[var(--main-color)] text-lg sm:text-xl" />
                <span className="text-gray-700 text-base sm:text-lg font-medium">
                  {t("phone")}: +963 991 519 824
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[var(--main-color)] text-lg sm:text-xl" />
                <span className="text-gray-700 text-base sm:text-lg font-medium">
                  {t("email")}: mbdacademy2023@email.com
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaGlobe className="text-[var(--main-color)] text-lg sm:text-xl" />
                <span className="text-gray-700 text-base sm:text-lg font-medium">
                  {t("online")}
                </span>
              </li>
            </ul>

            {/* SOCIAL MEDIA */}
            <div className="mt-10">
              <p className="text-gray-600 font-medium mb-4">{t("followUs")}</p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <a
                  href="https://x.com/MstfyB20453?t=W5-uTjpJOiGD9q3gf0bajA&s=09"
                  className="bg-[var(--main-color)] p-3 rounded-full text-white hover:bg-[var(--secondary-color-2)] transition"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://www.facebook.com/share/174f49pzap/"
                  className="bg-[var(--main-color)] p-3 rounded-full text-white hover:bg-[var(--secondary-color-2)] transition"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://www.instagram.com/mbd__academy?igsh=NW84Y3AzMWxtcXFz"
                  className="bg-[var(--main-color)] p-3 rounded-full text-white hover:bg-[var(--secondary-color-2)] transition"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.linkedin.com/in/mbd-academy-2b4938242/"
                  className="bg-[var(--main-color)] p-3 rounded-full text-white hover:bg-[var(--secondary-color-2)] transition"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://www.tiktok.com/@mbdacademy?_r=1&_t=ZS-91HSGGmsKcp"
                  className="bg-[var(--main-color)] p-3 rounded-full text-white hover:bg-[var(--secondary-color-2)] transition"
                >
                  <FaTiktok />
                </a>
                <a
                  href="https://t.me/@MBD_ACADEMY_2023"
                  className="bg-[var(--main-color)] p-3 rounded-full text-white hover:bg-[var(--secondary-color-2)] transition"
                >
                  <FaTelegram />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

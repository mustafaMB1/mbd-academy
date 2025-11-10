"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { FaFacebookF, FaLinkedin, FaTwitter, FaInstagram, FaTiktok, FaTelegram } from "react-icons/fa";
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";
import logo from '../assest/logo.png'
import Image from "next/image";
export default function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();

  const links = [
    { key: "home", en: "Home", ar: "الرئيسية", path: "" },
    { key: "about", en: "About", ar: "من نحن", path: "about" },
    { key: "courses", en: "Courses", ar: "الدورات", path: "courses" },
    { key: "trainers", en: "Trainers", ar: "المدربون", path: "trainers" },
    { key: "blog", en: "Blog", ar: "المدونة", path: "blog" },
    { key: "contact", en: "Contact", ar: "اتصل بنا", path: "contact" },
  ];

  const socialLinks = [
    { href: "https://x.com/MstfyB20453?t=W5-uTjpJOiGD9q3gf0bajA&s=09", icon: <FaTwitter /> },
    { href: "https://www.facebook.com/share/174f49pzap/", icon: <FaFacebookF /> },
    { href: "https://www.instagram.com/mbd__academy?igsh=NW84Y3AzMWxtcXFz", icon: <FaInstagram /> },
    { href: "https://www.linkedin.com/in/mbd-academy-2b4938242/", icon: <FaLinkedin /> },
    { href: "https://www.tiktok.com/@mbdacademy?_r=1&_t=ZS-91HSGGmsKcp", icon: <FaTiktok /> },
    { href: "https://t.me/@MBD_ACADEMY_2023", icon: <FaTelegram /> },
  ];

  return (
    <footer className="bg-gradient-to-t from-gray-900 via-gray-950 to-gray-900 text-gray-300 pt-16">
      <div className={`max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
        
        {/* القسم 1: معلومات الاتصال */}
        <div className="space-y-5">
          <h3 className="text-xl font-bold text-white">{t("contactTitle")}</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <HiOutlineLocationMarker className="text-[var(--main-color)] mt-1 w-5 h-5" />
              <span>{t("address")}</span>
            </li>
            <li className="flex items-center gap-3">
              <FiPhone className="text-white w-5 h-5" />
              <span>{t("phone")}</span>
            </li>
            <li className="flex items-center gap-3">
              <HiOutlineMail className="text-white w-5 h-5" />
              <span>{t("email")}</span>
            </li>
          </ul>
        </div>

        {/* القسم 2: روابط التنقل */}
        <div className="space-y-5">
          <h3 className="text-xl font-bold text-white">{t("linksTitle")}</h3>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.key}>
                <Link
                  href={`/${locale}/${link.path}`}
                  className="flex items-center gap-2 hover:text-[var(--secondary-color-2)] transition-colors duration-300"
                >
                  <span className="text-[var(--secondary-color-2)]">→</span> {locale === "ar" ? link.ar : link.en}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* القسم 3: تواصل اجتماعي */}
        <div className="space-y-5">
          <h3 className="text-xl font-bold text-white">{t("connectTitle")}</h3>
          <div className="flex flex-wrap gap-4 mt-2">
            {socialLinks.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-[var(--secondary-color-2)] text-white p-3 rounded-full transition-transform duration-300 hover:scale-110 flex items-center justify-center w-12 h-12"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* القسم 4: وصف العلامة التجارية */}
        <div className="space-y-5">
             <Image src={logo} alt="logo"/>
        </div>
      </div>

      {/* الحقوق */}
      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm">
        © 2023 {t("rights")} | {t("madeBy")} 💜
      </div>
    </footer>
  );
}

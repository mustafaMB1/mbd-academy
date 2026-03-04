"use client";

import { useTranslations, useLocale } from "next-intl";
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
  FaMapMarkerAlt,
} from "react-icons/fa";
import Image from "next/image";
import img from "../../../assest/AU-blog-teaching-strategies-_Help-with-Online-Learning.jpg";

export default function ContactPage() {
  const t = useTranslations("Contact");
  const locale = useLocale();
  const isAr = locale === "ar";

  const socials = [
    {
      href: "https://x.com/MstfyB20453?t=W5-uTjpJOiGD9q3gf0bajA&s=09",
      label: "X / Twitter",
      Icon: FaTwitter,
    },
    {
      href: "https://www.facebook.com/share/174f49pzap/",
      label: "Facebook",
      Icon: FaFacebookF,
    },
    {
      href: "https://www.instagram.com/mbd__academy?igsh=NW84Y3AzMWxtcXFz",
      label: "Instagram",
      Icon: FaInstagram,
    },
    {
      href: "https://www.linkedin.com/in/mbd-academy-2b4938242/",
      label: "LinkedIn",
      Icon: FaLinkedin,
    },
    {
      href: "https://www.tiktok.com/@mbdacademy?_r=1&_t=ZS-91HSGGmsKcp",
      label: "TikTok",
      Icon: FaTiktok,
    },
    {
      // ملاحظة: رابطك الحالي فيه @ بعد t.me وهذا غالباً خطأ
      // لو عندك username: https://t.me/MBD_ACADEMY_2023
      href: "https://t.me/MBD_ACADEMY_2023",
      label: "Telegram",
      Icon: FaTelegram,
    },
  ];

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="relative mt-[156px] overflow-hidden bg-[#070A16] text-white py-14 md:py-18"
    >
      {/* Background (dots + blobs) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.6)_1px,transparent_0)] [background-size:18px_18px]" />
      <div className="pointer-events-none absolute -top-28 -right-28 h-96 w-96 rounded-full bg-gradient-to-br from-fuchsia-600/22 via-purple-600/16 to-cyan-400/12 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-cyan-400/14 via-blue-500/12 to-fuchsia-600/16 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] ring-1 ring-white/10 px-4 py-2 text-xs text-white/80">
            <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.25)]" />
            {t("title")}
          </div>

          <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            {t("title")}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-white/70">
            {t("subtitle")}
          </p>

          <div className="mt-6 mx-auto h-[3px] w-24 rounded-full bg-gradient-to-r from-fuchsia-500/80 via-purple-500/70 to-cyan-400/70" />
        </div>

        {/* Content */}
        <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2 md:gap-8 items-stretch">
          {/* LEFT: Image glass card */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.25)]">
            <div className="relative h-[260px] sm:h-[340px] md:h-full md:min-h-[420px]">
              <Image src={img} alt="Global reach" fill className="object-cover bg-center" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070A16]/95 via-black/45 to-black/20" />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] ring-1 ring-white/10 px-3 py-1 text-xs text-white/80">
                <FaGlobe className="text-white/80" />
                <span>{t("globalTitle")}</span>
              </div>

              <p className="mt-3 text-sm sm:text-base text-white/75 leading-relaxed max-w-xl">
                {t("globalText")}
              </p>
            </div>

            {/* subtle highlight */}
            <div className="pointer-events-none absolute inset-0 opacity-60">
              <div className="absolute -inset-24 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-2xl" />
            </div>
          </div>

          {/* RIGHT: Contact details */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.22)] p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              {t("connectTitle")}
            </h3>
            <p className="mt-2 text-sm text-white/65">
              {t("connectSubtitle") || ""}
            </p>

            {/* Details */}
            <div className="mt-6 space-y-3">
              <InfoRow
                icon={<FaPhoneAlt />}
                label={t("phone")}
                value="+963 991 519 824"
              />
              <InfoRow
                icon={<FaEnvelope />}
                label={t("email")}
                value="mbdacademy2023@email.com"
              />
              <InfoRow
                icon={<FaGlobe />}
                label={t("online")}
                value={t("onlineValue") || (isAr ? "متاحون أونلاين" : "Available online")}
              />
              <InfoRow
                icon={<FaMapMarkerAlt />}
                label={t("location") || (isAr ? "الموقع" : "Location")}
                value={t("locationValue") || (isAr ? "سوريا" : "Syria")}
              />
            </div>

            {/* Social */}
            <div className="mt-8">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-white/80">
                  {t("followUs")}
                </p>
                <span className="text-xs text-white/40">
                  {isAr ? "روابط رسمية" : "Official links"}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="
                      group
                      inline-flex items-center justify-center
                      h-11 w-11 rounded-2xl
                      bg-white/[0.05] ring-1 ring-white/10
                      hover:bg-white/[0.08] hover:ring-white/20
                      transition
                    "
                  >
                    <Icon className="text-white/80 group-hover:text-white transition" />
                  </a>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="mailto:mbdacademy2023@email.com"
                className="inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold
                bg-gradient-to-r from-fuchsia-500/90 via-purple-500/90 to-cyan-400/80
                shadow-[0_0_30px_rgba(217,70,239,0.22)]
                hover:shadow-[0_0_45px_rgba(34,211,238,0.22)]
                transition"
              >
                {t("emailUs") || (isAr ? "راسلنا عبر البريد" : "Email us")}
              </a>

              <a
                href="tel:+963991519824"
                className="inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold
                bg-white/[0.05] ring-1 ring-white/10
                hover:bg-white/[0.08] hover:ring-white/20
                transition text-white"
              >
                {t("callUs") || (isAr ? "اتصل بنا الآن" : "Call now")}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#070A16] to-transparent" />
    </section>
  );
}

/* ---------- Helpers ---------- */

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-white/[0.03] ring-1 ring-white/10 px-4 py-3">
      <div className="mt-0.5 h-10 w-10 rounded-2xl bg-white/[0.06] ring-1 ring-white/10 flex items-center justify-center">
        <span className="text-white/85">{icon}</span>
      </div>

      <div className="min-w-0">
        <div className="text-xs font-bold text-white/60">{label}</div>
        <div className="mt-1 text-sm sm:text-base font-semibold text-white break-words">
          {value}
        </div>
      </div>
    </div>
  );
}
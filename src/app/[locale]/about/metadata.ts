import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Our Academy",
  description:
    "Learn more about our academy, our mission, training programs, and how we help students build successful careers through practical learning.",
  keywords: [
    "academy",
    "courses",
    "e-learning",
    "students",
    "training",
    "education",
  ],
  openGraph: {
    title: "About Our Academy",
    description:
      "Discover our academy's mission, services, and educational approach.",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "About Our Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Our Academy",
    description:
      "Explore our mission and the services we provide to support students.",
    images: ["/logo.jpg"],
  },
};

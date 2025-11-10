"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function AdminHomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      // إذا ما كان هناك توكن، نعيد التوجيه إلى صفحة الدخول
      router.replace("/ar");
    }
  }, [router]);

    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">مرحباً بك في لوحة التحكم</h2>
        <p className="text-gray-600">
          من هنا يمكنك إدارة جميع أقسام الأكاديمية بسهولة واحترافية.
        </p>
  
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            "الكورسات",
            "المدربين",
            "المقالات",
            "التقييمات",
            "الفئات",
            "خطط الأسعار",
            "المستويات",
          ].map((item) => (
            <div
              key={item}
              className="bg-white border shadow-sm rounded-xl p-4 text-center hover:shadow-md transition"
            >
              <p className="font-semibold">{item}</p>
              <p className="text-sm text-gray-500 mt-1">إدارة {item}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
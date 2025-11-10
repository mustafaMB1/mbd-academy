"use client";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import avatar from "@/../public/avatar.png";

export default function WhatsAppFloat() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <FloatingWhatsApp
        phoneNumber="0952684662"
        accountName="MBD Academy"
        chatMessage="Hello 👋 How can we help you today?"
        statusMessage="Typically replies within 5 mins"
        placeholder="Type your message..."
        avatar={avatar.src}
        notification
        notificationDelay={30}
        allowEsc
        allowClickAway={false} // 🩵 Disable auto-close on outside click
      />
    </div>
  );
}

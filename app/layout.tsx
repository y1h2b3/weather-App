import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "智能天气信息网页 - 精准预报、贴心建议",
  description: "提供实时天气查询、5天天气预报以及智能生活建议，包括穿衣、出行、运动和雨具建议。支持全球城市查询和地理定位功能。",
  keywords: ["天气预报", "天气查询", "生活建议", "天气API"],
  authors: [{ name: "智能天气团队" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from "@/components/ui/sidebar"; // Import SidebarProvider
import { AppSidebar } from "@/components/app-sidebar"; // Import AppSidebar

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EFS",
  description: "Emoji Feedback System",
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
        {/* Wrap children with SidebarProvider and include AppSidebar */}
        <SidebarProvider>
          <div className="flex">
            <AppSidebar />
            <main className="flex-1">{children}</main>
          </div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
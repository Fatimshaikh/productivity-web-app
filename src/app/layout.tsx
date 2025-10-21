import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "react-hot-toast"; // ✅ Added import

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Productivity App",
  description: "Track your daily tasks easily",
};

export const viewport = {
  themeColor: "#0f172a",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <Sidebar />
            <div className="flex flex-col flex-1 h-screen">
              <Navbar />
              <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-y-auto">
                {children}
              </main>
            </div>
          </AuthProvider>
          {/* ✅ Toast notifications available throughout the app */}
          <Toaster position="top-right" reverseOrder={false} />
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
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
  title: {
    default: "Ankit Kumar Singh",
    template: "%s | Ankit Kumar Singh",
  },
  description: "Ankit Kumar Singh is a Full Stack Developer skilled in React, Next.js, Node.js. Explore projects, experience and contact details.",

  //  Google verification add here
  verification: {
    google: "MkwTKtna9t6-d4SGtduVEeoivDcVnzk38mCScZtllsY",
  },

  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        {/* Global Toaster */}
        <Toaster
          position="top-right"
          containerStyle={{ zIndex: 999999 }}
          toastOptions={{
            duration: 4000,
            style: {
              background: "#111",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
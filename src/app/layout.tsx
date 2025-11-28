import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LOEMPIA BOOM",
  description: "Management Kasir Loempia Boom",
  openGraph: {
    title: "LOEMPIA BOOM",
    description: "Management Kasir Loempia Boom",
    url: "https://loempia-bom.putra-tunggal.my.id",
    siteName: "LOEMPIA BOOM",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Preview Loempia Boom",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        {children} <ToastContainer position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}

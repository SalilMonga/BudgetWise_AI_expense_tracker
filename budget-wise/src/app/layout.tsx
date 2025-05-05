import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import BodyWrapper from "./components/layout/BodyWrapper";
import Navbar from "./components/common/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SpendWise - Personal Finance Tracker",
  description: "Track your expenses and manage your finances with SpendWise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
    ${geistSans.variable} ${geistMono.variable}
    antialiased
    bg-[var(--background)]
    transition-colors duration-300 ease-in-out
  `}
      >
        <Providers>
          <Navbar />
          {/* <div className="pt-14">{children}</div> */}
          {/* Added BodyWrapper to prevent the hydration warning due to theme mismatch in server and client */}
          <BodyWrapper>{children}</BodyWrapper>
          {/* {children} */}
        </Providers>
      </body>
    </html>
  );
}

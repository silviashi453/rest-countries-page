import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import Header from "@/components/header";
import "./globals.css";
import Providers from "./provider";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.className}`}>
        <Providers>
          <Header />
          <main className="dark:bg-dark-main bg-light-main min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";

import "./globals.css";
import { Header } from "../components";
import { SESSION_COOKIE_NAME } from "../constants";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Next.js on Firebase App Hosting",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  const session = (await cookies()).get(SESSION_COOKIE_NAME)?.value || null;

  return (
    <html lang="en" className="dark-theme">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="dots" />
        <Header session={session}/>
        {children}
        <div className="bottom-gradient" />
      </body>
    </html>
  );
}

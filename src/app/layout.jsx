import {  } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Mood Sleep Tracker",
  description: "Projeto Final Individual Full Stack de um monitor de humor e sono.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

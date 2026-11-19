import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Naadu Nalam – Marketplace | Farm Products Direct from Farmers",
  description: "Naadu Nalam brings independent growers and small producers together in one marketplace — cold-pressed oils, native rice, whole spices, pure honey and everyday produce.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-nn-bg text-nn-text">
        {children}
      </body>
    </html>
  );
}

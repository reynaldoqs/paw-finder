import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainFooter, MainNavbar } from "@/components";
import Providers from "./providers";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Paw Finder",
  description: "Find lost pets",
};

const lato = Lato({
  variable: "--font-lato",
  weight: ["300", "400", "700", "900"],
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lato.className} antialiased min-h-screen w-full`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MainNavbar />
          <Providers>{children}</Providers>
          <MainFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}

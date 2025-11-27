import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { MainFooter, MainNavbar } from "@/src/components";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Paw Finder",
  description: "Find lost pets",
};

const inter_tight = Inter_Tight({
  variable: "--font-inter-tight",
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
      <body
        className={`${inter_tight.className} antialiased min-h-screen w-full`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MainNavbar />
          {children}
          <MainFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}

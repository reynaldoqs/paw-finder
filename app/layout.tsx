import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { MainNavbar } from "@/components";
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
      <body className={`${lato.className} antialiased h-screen w-full`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="h-dvh grid grid-rows-[auto_1fr]">
            <MainNavbar />
            <div className="overflow-auto h-full">
              <Providers>{children}</Providers>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

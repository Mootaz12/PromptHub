import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AntdRegistry } from "@ant-design/nextjs-registry";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PromptHub",
  description:
    "PromptHub is the ultimate platform for sharing, discovering, and collaborating on creative prompts. Whether you're a writer, artist, or thinker, find inspiration and join a community of like-minded individuals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className} dark:bg-dark-gradient bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 text-black dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 dark:text-white`}
        >
          <AntdRegistry>{children}</AntdRegistry>
        </body>
      </html>
    </ClerkProvider>
  );
}

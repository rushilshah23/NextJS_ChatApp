import { SocketProvider } from "@/context/SocketContext";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ChatProvider } from "@/context/ChatContext";
import { UserProvider } from "@/context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat!",
  description: "Chat with your loved ones !",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ChatProvider>
        <SocketProvider>



          <body className={inter.className}>{children}</body>
        </SocketProvider>
      
      </ChatProvider>
   
    </html>
  );
}

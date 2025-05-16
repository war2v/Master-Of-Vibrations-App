import Sidebar from "@/components/Sidebar";
import "./../globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";


import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongs from "@/actions/getSongs";
import Player from "@/components/Player";



const font = Figtree({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "MOV Dariu",
  description: "All Things MOV",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSongs = await getSongs();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
  
              {children}
              <Player />
          </UserProvider>
        </SupabaseProvider>
        
      </body>
    </html>
  );
}

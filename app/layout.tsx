import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/app/components/layout/Sidebar";
import FollowBar from "@/app/components/layout/FollowBar";
import { Toaster } from "react-hot-toast";

import LoginModal from "@/app/components/modals/LoginModal";
import RegisterModal from "@/app/components/modals/RegisterModal";
import EditModal from "@/app/components/modals/EditModal";

import AuthContext from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitter",
  description: "Welcome to Twitter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <Toaster />
          <EditModal />
          <RegisterModal />
          <LoginModal />
          <div className="container   h-screen mx-auto  max-w-6xl">
            <div className="grid  grid-cols-4 h-full">
              <Sidebar />

              <div className="col-span-3  lg:col-span-2 border-x-[1px] border-neutral-800">
                {children}
              </div>

              <FollowBar />
            </div>
          </div>
        </AuthContext>
      </body>
    </html>
  );
}

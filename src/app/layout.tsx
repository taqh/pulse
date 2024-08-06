import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
import MobileNavigation from "@/components/mobile-navigation";
import Footer from "@/components/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReduxWrapper from "./ReduxWrapper";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: 'Daza TV',
  description: 'Home of Arewa News and Movies',
  icons: {
    icon: "/og-logo2.png",
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxWrapper>
      <body className={inter.className}>
        <ToastContainer />
        <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
          <Navigation />
          <MobileNavigation />
          <main className="h-full w-full">{children}</main>
          <Footer />
        </div>
      </body>
    </ReduxWrapper>
  );
}

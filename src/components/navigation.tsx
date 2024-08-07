"use client";
import MaxWidthContainer from "@/components/max-width-container";
import {
  AudioWaveform,
  Facebook,
  Home,
  Instagram,
  MessageCircle,
  Search,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navigation() {
  const pathname = usePathname();

  return (
    <header className="sticky inset-x-0 top-0 z-[100] hidden h-16 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all md:block">
      <MaxWidthContainer className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-0 font-semibold lg:text-lg"
        >
          <Image
            src={"/og-logo2.png"}
            alt="logo"
            width={40}
            height={40}
            unoptimized
            className="object-contain"
          />
          <p>Daza TV</p>
        </Link>
        <nav>
          <ul
            className={`flex items-center min-w-full gap-6 text-lg font-medium transition duration-300`}
          >
            <li className="relative">
              <Link
                href="#"
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground outline-2 transition duration-300 hover:bg-gray-200 focus-visible:outline-dashed ${
                  pathname === "#"
                    ? "bg-orange-100 text-orange-500"
                    : "bg-transparent"
                }`}
              >
                <Home size={16} />
                Home 
              </Link>
            </li>
            <Link
              target="_blank"
              href="https://web.facebook.com/p/DAZA-TV-100063743503213/?paipv=0&eav=Afa-KB7UI3M66zNPz4n7WIPDNXQxl02xLWXoVCko1kjN8ZBD9WlzUtvEXZLxr6Nfp4w&_rdc=1&_rdr"
              className="rounded-md hover:bg-gray-200 p-2 text-sm transition-all duration-300"
            >
              <Facebook  className="shrink-0" size={18} />
            </Link>
            <Link
              target="_blank"
              href="https://www.youtube.com/channel/UCb4BvFRquPfEEmpwFYiMAog"
              className="rounded-md hover:bg-gray-200 p-2 text-sm transition-all duration-300"
            >
              <Youtube  className="shrink-0" size={18}  />
            </Link>
            <Link
              target="_blank"
              href="https://www.instagram.com/nuruddeendaza/"
              className="rounded-md hover:bg-gray-200 p-2 text-sm transition-all duration-300"
            >
              <Instagram  className="shrink-0" size={18} />
            </Link>
          </ul>
        </nav>
      </MaxWidthContainer>
    </header>
  );
}

export default Navigation;

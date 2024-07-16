"use client";
import Link from "next/link";
import MaxWidthContainer from "@/components/max-width-container";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AudioWaveform } from "lucide-react";

function MobileNavigation() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (expanded) {
      setExpanded(!expanded);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (expanded) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [expanded]);

  return (
    <header className="sticky inset-x-0 top-0 z-[100] h-14 border-b border-gray-200 bg-white/80 backdrop-blur-lg md:hidden">
      {/* logo */}
      <MaxWidthContainer className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold lg:text-lg"
        >
          <AudioWaveform className="text-orange-600" />
          <p>Pulse</p>
        </Link>

        {/* nav-controls */}
        <button
          type="button"
          title="toggle menu"
          aria-controls="mobile-menu"
          onClick={() => setExpanded((prev) => !prev)}
          className="z-50 flex h-7 flex-col justify-center gap-1 rounded-md border bg-white p-1.5 outline-2 outline-offset-2 md:hidden"
        >
          <span
            className={`h-0.5 w-6 rounded-full bg-orange-600 transition duration-500 ${
              expanded && "translate-y-1 rotate-45"
            }`}
            aria-hidden="true"
          ></span>
          <span
            className={`h-0.5 w-5 rounded-full bg-orange-600 transition duration-500 ${
              expanded && "hidden"
            }`}
            aria-hidden="true"
          ></span>
          <span
            className={`h-0.5 w-4 rounded-full bg-orange-600 transition duration-500 ${
              expanded && "w-6 -translate-y-0.5 -rotate-45"
            }`}
            aria-hidden="true"
          ></span>
        </button>

        {/* navigation */}
        <nav
          id="mobile-menu"
          className={`absolute inset-0 z-40 min-h-screen w-3/4 bg-white/80 backdrop-blur-lg transition-all duration-300 ease-in-out ${
            expanded ? "max-md:tranxlate-x-0" : "max-md:-translate-x-full"
          }`}
        >
          <ul className="flex h-full w-full flex-col gap-6 px-8 py-14 text-lg font-medium transition duration-300">
            <li className="relative">
              <Link
                href="#"
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground outline-2 transition duration-300 hover:bg-orange-100 focus-visible:outline-dashed ${
                  pathname === "#"
                    ? "bg-orange-100 text-orange-500"
                    : "bg-transparent"
                }`}
              >
                Search
              </Link>
            </li>
            <li className="relative">
              <Link
                href="/contact"
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground outline-2 transition duration-300 hover:bg-orange-100 focus-visible:outline-dashed ${
                  pathname === "/search"
                    ? "bg-orange-100 text-orange-500"
                    : "bg-transparent"
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* backdrop */}
        <div
          className={`fixed inset-0 z-20 min-h-screen bg-black/90 backdrop-blur-md transition md:hidden ${
            expanded ? "visible opacity-100" : "invisible opacity-0"
          }`}
          aria-hidden="true"
          onClick={() => setExpanded(false)}
        />
      </MaxWidthContainer>
    </header>
  );
}

export default MobileNavigation;

"use client";

import { useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isAdmin = true;

  return (
    <MaxWidthWrapper className="py-4 z-[100] backdrop-blur-sm border-b border-gray-200 sticky inset-x-0 top-0">
      <nav className="flex justify-between">
        <Link href="/" className="italic font-bold text-lg">
          _case<span className="text-blue-600">my</span>
          <span className="text-red-600">phone</span>
        </Link>

        {/* Menu for large devices */}
        <ul className="hidden lg:flex gap-4">
          <li>
            <Link
              href="/sign-up"
              className={buttonVariants({ size: "sm", variant: "ghost" })}
            >
              Sign Up
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              className={buttonVariants({ size: "sm", variant: "ghost" })}
            >
              Login
            </Link>
          </li>
          {isAdmin && (
            <li>
              <Link
                href="/dashboard"
                className={buttonVariants({ size: "sm", variant: "ghost" })}
              >
                Dashboard
              </Link>
            </li>
          )}
          <li>
            <Link
              href="/configure/upload"
              className={buttonVariants({
                size: "sm",
              })}
            >
              Customise
              <ArrowRight className="ml-1.5 h-5 w-5" />
            </Link>
          </li>
        </ul>
        {/* Menu for large devices (End) */}

        {/* Menu for Mobile */}
        <div className="relative block lg:hidden">
          {/* Hamburger button */}
          <button
            onClick={toggleMenu}
            className="text-zinc-950 focus:outline-none"
          >
            {isOpen ? (
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              </svg>
            ) : (
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.293 6.293a1 1 0 0 1 1.414 0L12 10.586l4.293-4.293a1 1 0 1 1 1.414 1.414L13.414 12l4.293 4.293a1 1 0 0 1-1.414 1.414L12 13.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L10.586 12 6.293 7.707a1 1 0 0 1 0-1.414z"
                />
              </svg>
            )}
          </button>

          <ul
            className={cn(
              `absolute flex flex-col right-6 border border-gray-300 px-2 rounded-sm bg-white`,
              {
                hidden: isOpen,
              }
            )}
          >
            <li className="border-b border-gray-200 px-4 py-2">
              <Link
                href="/sign-up"
                className={buttonVariants({ size: "sm", variant: "ghost" })}
              >
                Sign Up
              </Link>
            </li>
            <li className="border-b border-gray-200 px-4 py-2">
              <Link
                href="/login"
                className={buttonVariants({ size: "sm", variant: "ghost" })}
              >
                Login
              </Link>
            </li>
            {isAdmin && (
              <li className="border-b border-gray-200 px-4 py-2">
                <Link
                  href="/dashboard"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Dashboard
                </Link>
              </li>
            )}
            <li className="px-4 py-4">
              <Link
                href="/configure/upload"
                className={buttonVariants({
                  size: "sm",
                })}
              >
                Customise
                <ArrowRight className="ml-1.5 h-5 w-5" />
              </Link>
            </li>
          </ul>
        </div>
        {/* Menu for Mobile (End)*/}
      </nav>
    </MaxWidthWrapper>
  );
}

export default Navbar;

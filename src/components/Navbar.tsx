"use client";
import React, { useEffect, useRef, useState } from "react";
import ThemeToggleButton from "./ThemeToggleButton";
import { SignOutButton, useAuth } from "@clerk/nextjs";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import Link from "next/link";

const Navbar = () => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const { isSignedIn, userId } = useAuth();
  const navbarRef = useRef<HTMLUListElement | null>(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  //functions
  const toggleMenu = () => {
    setMenuIsOpen((prev) => !prev);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target as Node)
    ) {
      setMenuIsOpen(false);
    }
  };

  return (
    <header>
      <nav className="flex flex-row items-start justify-between bg-transparent px-8 py-8 md:items-center md:px-14 md:py-5 lg:px-28 lg:py-8">
        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text font-popping text-3xl font-normal text-transparent md:text-3xl md:font-medium lg:text-4xl lg:font-semibold">
          <Link href={"/"}>PromptHub </Link>
        </span>
        {/* Large and medium devices */}
        <ul className="hidden items-center md:flex md:flex-row md:gap-5">
          <ThemeToggleButton />

          <li className="text-lg lg:text-2xl">
            {isSignedIn ? (
              <div className="flex flex-row items-center gap-10">
                <button className="rounded-xl border-2 bg-neutral-600 px-5 py-2 font-medium text-white dark:bg-transparent">
                  <Link href={"/create-prompt"}> Create Prompt</Link>
                </button>
                <button className="rounded-xl border-2 bg-neutral-600 px-5 py-2 font-medium text-white dark:bg-transparent">
                  <Link href={`/user/${userId}`}> Profile</Link>
                </button>
                <div className="rounded-xl border-2 px-5 py-2 font-medium">
                  <SignOutButton />
                </div>
                <div className="flex scale-[2] items-center justify-center">
                  <UserButton />
                </div>
              </div>
            ) : (
              <div className="flex flex-row items-center gap-5">
                <div className="rounded-xl border-2 px-5 py-2 font-medium">
                  <SignInButton />
                </div>
                <div className="rounded-xl border-2 px-5 py-2 font-medium">
                  <SignUpButton />
                </div>
              </div>
            )}
          </li>
        </ul>
        {/* Small devices */}
        <ul className="md:hidden" ref={navbarRef}>
          <button
            className="rounded-md p-2 text-2xl transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
            type="button"
            onClick={toggleMenu}
          >
            {menuIsOpen ? (
              <CloseOutlined style={{ fontSize: "24px" }} />
            ) : (
              <MenuOutlined style={{ fontSize: "24px" }} />
            )}
          </button>
          {menuIsOpen && (
            <div className="absolute right-4 top-20 transform rounded-md bg-white p-4 text-gray-800 shadow-lg transition-transform dark:bg-gray-800 dark:text-gray-200">
              <div className="flex flex-col gap-5">
                {isSignedIn ? (
                  <div className="flex flex-col items-center">
                    <div className="mt-3 scale-150">
                      <UserButton />
                    </div>
                    <button className="block rounded-md px-4 py-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700">
                      <Link href={"/create-prompt"}> Create Prompt</Link>
                    </button>
                    <button className="block rounded-md px-4 py-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700">
                      <Link href={`/user/${userId}`}> Profile</Link>
                    </button>
                    <div className="block rounded-md px-4 py-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700">
                      <SignOutButton />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="block rounded-md px-4 py-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700">
                      <SignInButton />
                    </div>
                    <div className="block rounded-md px-4 py-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700">
                      <SignUpButton />
                    </div>
                  </div>
                )}
                <ThemeToggleButton />
              </div>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

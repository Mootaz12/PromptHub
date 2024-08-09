import { auth } from "@clerk/nextjs/server";
import Navbar from "@/components/Navbar";
import React from "react";

export default function UserPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth().protect();

  return (
    <React.Fragment>
      <Navbar />
      {children}
    </React.Fragment>
  );
}

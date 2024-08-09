import type { PropsWithChildren } from "react";
import { auth } from "@clerk/nextjs/server";
import Navbar from "@/components/Navbar";

export default function CreatePromptLayout(props: PropsWithChildren) {
  const { userId } = auth().protect();

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center">{props.children}</div>
    </>
  );
}

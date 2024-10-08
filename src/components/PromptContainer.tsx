"use client";
import { Prompt } from "@/types";
import PromptCard from "./PromptCard";
import { Suspense } from "react";
import { Spin } from "antd";

const PromptContainer = ({
  prompts,
  onDeletePrompt,
}: {
  prompts: Prompt[];
  onDeletePrompt: (id: string) => void;
}) => {
  return (
    <Suspense fallback={<Spin />}>
      <section className="mt-10 flex flex-wrap items-center justify-center gap-10">
        {prompts &&
          prompts.length > 0 &&
          prompts.map((prompt: Prompt) => (
            <PromptCard
              prompt={prompt}
              key={prompt.id}
              onDeletePrompt={onDeletePrompt}
            />
          ))}
      </section>
    </Suspense>
  );
};

export default PromptContainer;

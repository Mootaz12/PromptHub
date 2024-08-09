"use client";
import { Prompt } from "@/types";
import PromptCard from "./PromptCard";

const PromptContainer = ({
  prompts,
  onDeletePrompt,
}: {
  prompts: Prompt[];
  onDeletePrompt: (id: string) => void;
}) => {
  return (
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
  );
};

export default PromptContainer;

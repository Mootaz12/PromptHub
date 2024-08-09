"use client";
import PromptContainer from "@/components/PromptContainer";
import { useLazyGetPromptsByAuthorQuery } from "@/services/propmtApi";
import { Prompt } from "@/types";
import React, { useEffect, useState } from "react";

function UserPrompts({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [getPromptsByAuthor, {}] = useLazyGetPromptsByAuthorQuery();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const handleDeletePrompt = (id: string) => {
    setPrompts((prevPrompts) =>
      prevPrompts.filter((prompt) => prompt.id !== id),
    );
  };
  useEffect(() => {
    getPromptsByAuthor(slug).then((res) => {
      if (res.isSuccess) {
        setPrompts(res.data);
      }
    });
  }, [slug, getPromptsByAuthor]);
  return (
    <PromptContainer prompts={prompts} onDeletePrompt={handleDeletePrompt} />
  );
}

export default UserPrompts;

"use client";
import PromptContainer from "./PromptContainer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchPromtSchema } from "@/schemas";
import { useLazyGetPromptsByTagQuery } from "@/services/propmtApi";
import React, { useState } from "react";
import { Prompt } from "@/types";
import { Spin } from "antd";

type SearchPromptFormValues = {
  searchTerm: string;
};

const SearchPromptForm = () => {
  const [getPromptsByTag, { isFetching }] = useLazyGetPromptsByTagQuery();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const handleDeletePrompt = (id: string) => {
    setPrompts((prevPrompts) =>
      prevPrompts.filter((prompt) => prompt.id !== id),
    );
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SearchPromptFormValues>({
    resolver: zodResolver(searchPromtSchema),
  });

  const onSubmit = async (data: SearchPromptFormValues) => {
    try {
      await getPromptsByTag(data.searchTerm).then((res) => {
        if (res.status === "fulfilled") {
          setPrompts((prev) => res.data || []);
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      reset({
        searchTerm: "",
      });
    }
  };

  return (
    <section className="flex flex-col items-center justify-center gap-10">
      <form
        className="mt-5 flex items-center justify-center md:mt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("searchTerm")}
          type="text"
          placeholder="Search for a tag or a username"
          className="w-[300px] rounded-lg px-5 py-2 text-neutral-900 outline outline-1 outline-gray-400 focus-within:outline-blue-300 dark:focus-within:outline-none md:w-[500px] lg:w-[600px]"
        />
        {errors.searchTerm && (
          <span className="text-sm text-red-500">
            {errors.searchTerm.message}
          </span>
        )}
        <button type="submit" hidden></button>
      </form>
      {isFetching ? (
        <Spin />
      ) : (
        <PromptContainer
          prompts={prompts}
          onDeletePrompt={handleDeletePrompt}
        />
      )}
    </section>
  );
};

export default SearchPromptForm;

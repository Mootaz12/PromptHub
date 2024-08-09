"use client";

import { promptSchema } from "@/schemas";
import {
  useLazyGetPromptByIdQuery,
  useUpdatePromptMutation,
} from "@/services/propmtApi";
import { Prompt } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const UpdatePromptForm = ({ promptId }: { promptId: string }) => {
  const [updatePrompt] = useUpdatePromptMutation();
  const [getPromptById] = useLazyGetPromptByIdQuery();
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<Prompt>({
    resolver: zodResolver(promptSchema),
  });

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const res = await getPromptById(promptId).unwrap();
        if (res) {
          setPrompt(res);
        }
      } catch (error) {
        console.error("Failed to fetch prompt", error);
      }
    };

    fetchPrompt();
  }, [getPromptById, promptId]);

  useEffect(() => {
    if (prompt) {
      reset(prompt);
    }
    setFocus("content");
  }, [prompt, reset, setFocus]);

  const onSubmit = async (data: Prompt) => {
    try {
      await updatePrompt({ id: promptId, ...data }).unwrap();
      message.success("Prompt updated successfully!");
      router.push("/");
    } catch (error) {
      console.error("Failed to update the prompt", error);
      message.error("Failed to update the prompt.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-fit space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Content
        </label>
        <textarea
          {...register("content")}
          rows={4}
          className="w-full rounded-md border px-3 py-2 dark:bg-gray-900 dark:text-gray-100"
        />
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Tag
        </label>
        <input
          {...register("tag")}
          className="w-full rounded-md border px-3 py-2 dark:bg-gray-900 dark:text-gray-100"
        />
        {errors.tag && (
          <p className="text-sm text-red-500">{errors.tag.message}</p>
        )}
      </div>
      <div>
        <button
          type="submit"
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default UpdatePromptForm;

"use client";
import { promptSchema } from "@/schemas";
import { useCreatePromptMutation } from "@/services/propmtApi";
import { Prompt } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { message } from "antd";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
const CreatePromptForm = () => {
  const [createPrompt, { isLoading, isSuccess }] = useCreatePromptMutation();
  const { userId } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(promptSchema),
  });

  useEffect(() => {
    reset({
      author: userId || "",
    });
  }, [userId, reset]);
  const onSubmit = async (prompt: Prompt) => {
    try {
      await createPrompt(prompt).then((res) => {
        if (res.error) {
          message.error("Prompt creation failed");
        } else {
          message.success("Prompt created successfully");
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      reset({
        author: userId,
        content: "",
        tag: "",
      });
    }
  };
  return (
    <form
      className="mt-5 flex max-w-[300px] flex-col items-center gap-4 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 md:max-w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full flex-col gap-2">
        <label
          htmlFor="prompt"
          className="text-sm font-semibold text-gray-700 dark:text-gray-300 md:text-lg"
        >
          Your Prompt
        </label>
        <textarea
          {...register("content")}
          cols={30}
          rows={8}
          placeholder="Write your propmt here . . ."
          className="rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:focus:ring-blue-400"
        />
        {errors.content && (
          <span className="text-sm text-red-500">
            {typeof errors.content.message === "string"
              ? errors.content.message
              : "Invalid input"}
          </span>
        )}
      </div>
      <div className="flex w-full flex-col gap-2">
        <label
          htmlFor="tags"
          className="text-sm font-semibold text-gray-700 dark:text-gray-300 md:text-lg"
        >
          Tag (#product, #webdevelopment, #idea)
        </label>
        <input
          type="text"
          placeholder="#tag"
          {...register("tag")}
          className="rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:focus:ring-blue-400"
        />
        {errors.tag && (
          <span className="text-sm text-red-500">
            {typeof errors.tag.message === "string"
              ? errors.tag.message
              : "Invalid input"}
          </span>
        )}
      </div>
      <button
        type="submit"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default CreatePromptForm;

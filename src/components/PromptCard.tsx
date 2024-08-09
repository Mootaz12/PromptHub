import React, { useEffect, useState } from "react";
import { useDeletePromptMutation } from "@/services/propmtApi";
import { Prompt } from "@/types";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useLazyGetUserByIdQuery } from "@/services/userApi";
import { message, Tag } from "antd";
import Image from "next/image";
import { CheckOutlined, CopyOutlined } from "@ant-design/icons";

const PromptCard = ({
  prompt,
  onDeletePrompt,
}: {
  prompt: Prompt;
  onDeletePrompt: (id: string) => void;
}) => {
  const [user, setUser] = useState<any>(null);
  const { userId } = useAuth();
  const [deletePrompt] = useDeletePromptMutation();
  const [getUserById] = useLazyGetUserByIdQuery();
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    if (prompt.author) {
      getUserById(prompt.author)
        .unwrap()
        .then((userData) => {
          setUser(userData);
        })
        .catch((err) => {
          console.error("Failed to fetch user:", err);
        });
    }
  }, [getUserById, prompt.author]);

  const handleDelete = async () => {
    try {
      await deletePrompt(prompt.id).unwrap();
      onDeletePrompt(prompt.id);
      message.success("Prompt deleted successfully!");
    } catch (error) {
      console.error("Failed to delete the prompt", error);
    }
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex max-w-sm flex-col gap-3 overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <Image
            src={user?.imageUrl}
            alt="User image"
            height={40}
            width={40}
            className="rounded-full"
          />
          <div className="flex flex-col text-left">
            <Link
              href={`/user/${user?.id}`}
              className="text-sm font-semibold text-blue-500 hover:underline"
            >
              {user?.username}
            </Link>
            <p className="break-words text-xs text-gray-600 dark:text-gray-400">
              {user?.emailAddresses[0]?.emailAddress}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={copyPrompt}
          className="text-gray-600 hover:text-blue-500 dark:text-gray-400"
        >
          {isCopied ? (
            <CheckOutlined className="mr-1" />
          ) : (
            <CopyOutlined className="mr-1" />
          )}
          {isCopied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="mt-2 flex flex-col gap-2">
        <p className="break-words text-center text-sm text-gray-800 dark:text-gray-200">
          {prompt.content}
        </p>
        <Tag color="blue" className="max-w-fit text-xs">
          {prompt.tag}
        </Tag>
      </div>
      {userId === prompt.author && (
        <div className="mt-3 flex gap-2">
          <Link
            href={`/update-prompt/${prompt.id}`}
            className="rounded-md bg-blue-500 px-3 py-1 text-xs text-white hover:bg-blue-600"
          >
            Update
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-md bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptCard;

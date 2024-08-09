"use client";

import UpdatePromptForm from "@/components/UpdatePromptForm";
import ReduxProvider from "@/providers/ReduxProvider";

const UpdatePromptPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="mx-auto max-w-lg rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
      <h1 className="mb-4 text-2xl font-bold">Update Prompt</h1>
      <ReduxProvider>
        <UpdatePromptForm promptId={params.id} />
      </ReduxProvider>
    </div>
  );
};

export default UpdatePromptPage;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Prompt } from "@/types";

export const promptApi = createApi({
  reducerPath: "promptApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  tagTypes: ["Prompt"],
  endpoints: (builder) => ({
    // Create a new prompt
    createPrompt: builder.mutation<Prompt, Partial<Prompt>>({
      query: (body) => ({
        url: "/prompt",
        method: "POST",
        body,
      }),
    }),
    // Get all prompts
    getPrompts: builder.query<Prompt[], void>({
      query: () => "/prompt",
      providesTags: ["Prompt"],
    }),
    // Get a single prompt by ID
    getPromptById: builder.query<Prompt, string>({
      query: (id) => `/prompt/${id}`,
    }),
    // Get prompts by tag
    getPromptsByTag: builder.query<Prompt[], string>({
      query: (tag) => `/prompt?tag=${tag}`,
    }),
    //Get prompts by author
    getPromptsByAuthor: builder.query<Prompt[], string>({
      query: (author) => `/prompt?author=${author}`,
    }),
    // Update a prompt by ID
    updatePrompt: builder.mutation<
      Prompt,
      { id: string; prompt: Partial<Prompt> }
    >({
      query: ({ id, prompt }) => ({
        url: `/prompt/${id}`,
        method: "PATCH",
        body: prompt,
      }),
    }),
    // Delete a prompt by ID
    deletePrompt: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/prompt/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreatePromptMutation,
  useLazyGetPromptsQuery,
  useLazyGetPromptByIdQuery,
  useLazyGetPromptsByAuthorQuery,
  useLazyGetPromptsByTagQuery,
  useUpdatePromptMutation,
  useDeletePromptMutation,
} = promptApi;

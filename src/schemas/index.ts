import { z } from "zod";

export const promptSchema = z.object({
  id: z.string().optional(),
  content: z.string().min(1, "Promt cannot be empty"),
  author: z.string(),
  tag: z.string().min(1, "Tag cannot be empty"),
});
export const searchPromtSchema = z.object({
  searchTerm: z.string().min(1).max(100),
});

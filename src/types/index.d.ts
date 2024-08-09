import { z } from "zod";
export declare type Prompt = z.infer<promptSchema>;
export declare type SearchPromptFormValues = {
  searchTerm: string;
};

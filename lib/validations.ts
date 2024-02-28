import { z } from 'zod';

export const QuestionsSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 10 characters.')
    .max(130, 'Title must be at most 130 characters.'),
  explanation: z
    .string()
    .min(100, 'Explanation must be at least 100 characters.'),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});

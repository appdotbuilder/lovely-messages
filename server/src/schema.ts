import { z } from 'zod';

// Love message schema
export const loveMessageSchema = z.object({
  id: z.number(),
  message: z.string(),
  category: z.string(),
  created_at: z.coerce.date()
});

export type LoveMessage = z.infer<typeof loveMessageSchema>;

// Input schema for creating love messages
export const createLoveMessageInputSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
  category: z.string().default("general") // Categories like "morning", "evening", "sweet", "funny", etc.
});

export type CreateLoveMessageInput = z.infer<typeof createLoveMessageInputSchema>;

// Input schema for getting messages by category (optional filter)
export const getMessagesByCategoryInputSchema = z.object({
  category: z.string().optional()
});

export type GetMessagesByCategoryInput = z.infer<typeof getMessagesByCategoryInputSchema>;
import { z } from 'zod';

export const createIssueSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED", "REOPENED", "OVERDUE", "COMPLETED", "CANCELLED", "NOT_STARTED"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "NORMAL", "CRITICAL"]),
  organizationId: z.string().optional(),
  userId: z.string().optional(),
  user: z.string().optional(),
  assignedToUserId: z.string().optional(),
  // organizationId: z.string().optional(),
  // userId: z.string().optional(),

});

export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(255)
    .optional(),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required.")
    .max(255)
    .optional()
    .nullable(),
});

export const createGroundSchema = z.object({
  name: z
    .string()
    .min(3, "Name is required.")
    .max(255)
    .optional(),
});


export type CreateIssueSchema = z.infer<typeof createIssueSchema>;
export type PatchIssueSchema = z.infer<typeof patchIssueSchema>;
export type CreateGroundSchema = z.infer<typeof createGroundSchema>;
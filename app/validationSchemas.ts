import { z } from 'zod';

export const createIssueSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED", "REOPENED", "OVERDUE", "COMPLETED", "CANCELLED", "NOT_STARTED"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "NORMAL", "CRITICAL"]),
  organizationId: z.string().optional(),
  userId: z.string().optional(),
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

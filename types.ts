
import {Priority, Status, User, Role} from "@prisma/client";

export interface Issue {
  id: string;
  title: string; // Assuming 'name' is the correct property you're using. If not, use 'title' or the appropriate field.
  description: string;
  status: Status;
  priority: Priority;
  assignedToUserId?: string | null;
  assignedToUser?: Users | null; // Make sure this matches the correct interface for a user. It seems like it should be 'User' to align with your Prisma model.
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Users {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  role: Role | null;
}


import {Priority, Status, User, Role} from "@prisma/client";

export interface Issue {
  id: string;
  name: string;
  description: string;
  timeline: Date[];
  status: Status;
  priority: Priority;
  assignedToUserId?: string | null;
  assignedToUser?: Users | null;
  dueDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Projects {
  id: string;
  name: string;
  description: string;
  industry: string | null;
  rating: string | null;
  members?: User[];
  createAt?: Date;
  updateAt?: Date;
}

export interface Users {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  role: Role | null;
}

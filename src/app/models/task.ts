import { Category } from "./category";
import { User } from "./user";

export class Task {
  id!: number;
  title!: string;
  description!: string;
  important!: number;
  assignee!: User;
  dueDate!: Date;
  createdAt!: Date;
  updatedAt!: Date;
  done!: boolean;
  category!: Category;
}

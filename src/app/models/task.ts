import { Category } from "./category";

export class Task {
  id!: number;
  title!: string;
  description!: string;
  important!: number;
  dueDate!: Date;
  createdAt!: Date;
  updatedAt!: Date;
  done!: boolean;
  category!: Category;
}

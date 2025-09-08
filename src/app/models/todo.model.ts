export interface Todo {
  id: string;
  title: string;
  description?: string;
  date_deadline?: Date;
  date_created: Date;
  completed: boolean;
}
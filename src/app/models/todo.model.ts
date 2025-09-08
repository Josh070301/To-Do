export interface Todo {
  id: string;
  title: string;
  description?: string;
  date_created: Date;
  completed: boolean;
}
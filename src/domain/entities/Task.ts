export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  estimatedTime?: number; // em minutos
  timeSpent: number; // em minutos
  subtasks: Subtask[];
  createdAt: Date;
  dueDate?: Date;
  tags: string[];
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

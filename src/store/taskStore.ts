import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task, TaskStatus } from '../domain/entities/Task';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'timeSpent' | 'subtasks'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  addSubtask: (taskId: string, title: string) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
  deleteSubtask: (taskId: string, subtaskId: string) => void;
  addTimeToTask: (taskId: string, minutes: number) => void;
  getTasksByStatus: (status: TaskStatus) => Task[];
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      addTask: (taskData) => {
        const newTask: Task = {
          ...taskData,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          timeSpent: 0,
          subtasks: [],
        };
        set((state) => ({ tasks: [...state.tasks, newTask] }));
      },
      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      updateTaskStatus: (id, status) =>
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (task.id !== id) return task;
            
            const updates: Partial<Task> = { status };
            
            // Se mover para "em progresso" e não tiver data de início, adiciona data atual
            if (status === 'in-progress' && !task.startDate) {
              updates.startDate = new Date();
            }
            
            // Se mover para "concluída" e não tiver data de término, adiciona data atual
            if (status === 'done' && !task.dueDate) {
              updates.dueDate = new Date();
            }
            
            return { ...task, ...updates };
          }),
        })),
      addSubtask: (taskId, title) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  subtasks: [
                    ...task.subtasks,
                    { id: crypto.randomUUID(), title, completed: false },
                  ],
                }
              : task
          ),
        })),
      toggleSubtask: (taskId, subtaskId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  subtasks: task.subtasks.map((sub) =>
                    sub.id === subtaskId
                      ? { ...sub, completed: !sub.completed }
                      : sub
                  ),
                }
              : task
          ),
        })),
      deleteSubtask: (taskId, subtaskId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  subtasks: task.subtasks.filter((sub) => sub.id !== subtaskId),
                }
              : task
          ),
        })),
      addTimeToTask: (taskId, minutes) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, timeSpent: task.timeSpent + minutes }
              : task
          ),
        })),
      getTasksByStatus: (status) => {
        return get().tasks.filter((task) => task.status === status);
      },
    }),
    {
      name: 'tasks-storage',
    }
  )
);

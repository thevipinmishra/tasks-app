import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { z } from "zod";
import type { todoSchema } from "../schemas/todo";

export type _Todo = z.infer<typeof todoSchema>;

export interface Todo extends _Todo {
  id: string;
  createdAt: Date;
}

type TodoStore = {
  todos: Todo[];
  addTodo: (todo: _Todo) => void;
  editTodo: (id: string, updatedFields: Partial<Omit<Todo, "id">>) => void;
  removeTodo: (id: string) => void;
};

const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (todo: _Todo) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: crypto.randomUUID(),
              createdAt: new Date(),
              ...todo,
            },
          ],
        })),
      removeTodo: (id: string) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      editTodo: (id: string, updatedFields: Partial<Omit<Todo, "id">>) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, ...updatedFields } : todo
          ),
        })),
    }),
    {
      name: "todo-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ todos: state.todos }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Convert createdAt strings back to Date objects
          state.todos = state.todos.map(todo => ({
            ...todo,
            createdAt: new Date(todo.createdAt)
          }));
        }
      },
    }
  )
);

// hooks
export const useTodos = () => useTodoStore((state) => state.todos);
export const useAddTodo = () => useTodoStore((state) => state.addTodo);
export const useEditTodo = () => useTodoStore((state) => state.editTodo);
export const useRemoveTodo = () => useTodoStore((state) => state.removeTodo);

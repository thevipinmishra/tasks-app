import type { Todo } from "../store/todos";

export const STATUS_CONFIG: { status: Todo["status"]; label: string }[] = [
  { status: "pending", label: "Pending" },
  { status: "in-progress", label: "In Progress" },
  { status: "completed", label: "Completed" },
];

export const groupByStatus = (todos: Todo[]) => {
  return todos.reduce(
    (acc, task) => {
      acc[task.status].push(task);
      return acc;
    },
    {
      pending: [] as Todo[],
      "in-progress": [] as Todo[],
      completed: [] as Todo[],
    }
  );
};

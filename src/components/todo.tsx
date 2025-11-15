import clsx from "clsx";
import { useRemoveTodo, type Todo as TodoType } from "./store/todos";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { todoStatusColors } from "./utils/todo-status";
import { formatDate } from "./utils/formatDate";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

interface TodoProps extends React.HTMLAttributes<HTMLDivElement> {
  todo: TodoType;
}

export const Todo = ({ className, todo, ...rest }: TodoProps) => {
  const { id, title, status, description } = todo;
  const removeTodo = useRemoveTodo();

  const handleRemoveTodo = (id: string) => {
    removeTodo(id);
    toast.success("Todo deleted successfully!");
  };
  return (
    <div
      className={clsx(
        "rounded-[3px] flex gap-3.5 hover:bg-secondary p-3.5 transition-colors",
        className
      )}
      {...rest}
    >
      <div className="size-7.5 flex justify-center items-center aspect-square shrink-0 rounded-full bg-white border border-primary">
        <span className="text-primary">{title.at(0)?.toUpperCase()}</span>
      </div>
      <div className="flex-1">
        <div className="flex items-baseline gap-10">
          <h2 className="font-semibold text-sm text-primary flex-1">{title}</h2>
          <p className="capitalize inline-flex items-center text-xs leading-none">
            <span
              className={clsx(
                "size-2.5 aspect-square rounded-full inline-flex me-1 ",
                todoStatusColors[status]
              )}
            />
            {status}
          </p>
        </div>
        {description && (
          <p className="text-xs mt-1.5 text-primary-foreground">
            {description}
          </p>
        )}
        <div className="flex justify-between gap-6 mt-4">
          <p className="text-[10px] text-[#767676]">
            {formatDate(todo.createdAt)}
          </p>
          <div className="flex gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/edit/$id"
                  params={{ id }}
                  className="size-7 flex rounded-md text-primary hover:bg-primary/10 transition-colors justify-center items-center"
                >
                  <PencilIcon className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleRemoveTodo(id)}
                  className="size-7 flex hover:bg-red-100 text-red-600 justify-center items-center transition-colors rounded-md"
                >
                  <Trash2Icon className="size-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

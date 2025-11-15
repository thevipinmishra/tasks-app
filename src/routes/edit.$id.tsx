import {
  createFileRoute,
  Link,
  useParams,
  useNavigate,
} from "@tanstack/react-router";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Header, HeaderTitle } from "../components/layout/header";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { todoSchema } from "../components/schemas/todo";
import { useTodos, useEditTodo, type _Todo } from "../components/store/todos";
import { AlertCircleIcon, ArrowLeftIcon } from "lucide-react";
import { toast } from "sonner";
import clsx from "clsx";
import { todoStatusColors } from "../components/utils/todo-status";

export const Route = createFileRoute("/edit/$id")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Edit | TO-DO Task",
      },
    ],
  }),
});

function RouteComponent() {
  const { id } = useParams({ from: "/edit/$id" });
  const todos = useTodos();
  const editTodo = useEditTodo();
  const navigate = useNavigate();

  const todo = todos.find((t) => t.id === id);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: todo?.title || "",
      description: todo?.description || "",
      status: todo?.status || "pending",
    },
    values: todo
      ? {
          title: todo.title,
          description: todo.description,
          status: todo.status,
        }
      : undefined,
  });

  const onSubmit: SubmitHandler<_Todo> = (data) => {
    if (!todo) {
      toast.error("Todo not found!");
      return;
    }

    editTodo(todo.id, {
      title: data.title,
      description: data.description,
      status: data.status,
    });

    toast.success("Todo updated successfully!");
    navigate({ to: "/" });
  };

  if (!todo) {
    return (
      <>
        <main className="p-4">
          <div className="flex items-center bg-red-50 text-red-800 border border-red-200 rounded-[3px] px-4 py-2.5 gap-4">
            <AlertCircleIcon className="size-5 shrink-0 " />
            <p>Todo not found</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header className="flex items-center gap-5">
        <Link to="/">
          <ArrowLeftIcon />
        </Link>
        <HeaderTitle>Edit Task</HeaderTitle>
      </Header>
      <main className="p-4 space-y-5">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Enter the title"
            error={errors?.title?.message}
            {...register("title")}
          />
          <Textarea
            rows={4}
            placeholder="Enter the description"
            {...register("description")}
            className="resize-none"
          />
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">
                    <span
                      className={clsx(
                        "size-2.5 aspect-square rounded-full inline-flex me-1.5 ",
                        todoStatusColors["pending"]
                      )}
                    />
                    Pending
                  </SelectItem>
                  <SelectItem value="in-progress">
                    <span
                      className={clsx(
                        "size-2.5 aspect-square rounded-full inline-flex me-1.5 ",
                        todoStatusColors["in-progress"]
                      )}
                    />
                    In Progress
                  </SelectItem>
                  <SelectItem value="completed">
                    <span
                      className={clsx(
                        "size-2.5 aspect-square rounded-full inline-flex me-1.5 ",
                        todoStatusColors["completed"]
                      )}
                    />
                    Completed
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <div className="flex justify-between gap-6">
            <Button asChild variant="outlined" className="min-w-[110px]">
              <Link to="/">Cancel</Link>
            </Button>
            <Button type="submit" variant="filled" className="min-w-[110px]">
              Update
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}

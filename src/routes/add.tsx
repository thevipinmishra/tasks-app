import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Header, HeaderTitle } from "../components/layout/header";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { todoSchema } from "../components/schemas/todo";
import { useAddTodo, type _Todo } from "../components/store/todos";
import { ArrowLeftIcon } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/add")({
  component: RouteComponent,
    head: () => ({
    meta: [
        {
            title: "Add New | TO-DO Task",
        }
    ]
  })
});

function RouteComponent() {
  const addTodo = useAddTodo();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(todoSchema),
  });

  const onSubmit: SubmitHandler<_Todo> = (data) => {
    const todo: _Todo = {
      title: data.title,
      description: data.description,
      status: "pending",
    };

    addTodo(todo);
    reset();
    toast.success("Todo added successfully!");
    navigate({
      from: "/add",
      to: "/",
    });
  };
  return (
    <>
      <Header className="flex items-center gap-5">
        <Link to="..">
          <ArrowLeftIcon />
        </Link>
        <HeaderTitle>Add Task</HeaderTitle>
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
          <div className="flex justify-between gap-6">
            <Button asChild variant="outlined" className="min-w-[110px]">
              <Link to="..">Cancel</Link>
            </Button>
            <Button type="submit" variant="filled" className="min-w-[110px]">
              Add
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}

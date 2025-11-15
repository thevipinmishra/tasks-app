import { createFileRoute, Link } from "@tanstack/react-router";
import { Header, HeaderTitle } from "../components/layout/header";
import { ChevronDownIcon, InfoIcon, PlusIcon, SearchIcon } from "lucide-react";
import { Input } from "../components/ui/input";
import { useTodos } from "../components/store/todos";
import { Todo } from "../components/todo";
import {
  groupByStatus,
  STATUS_CONFIG,
} from "../components/utils/groupTodosByStatus";
import { Accordion } from "radix-ui";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  head: () => ({
    meta: [
        {
            title: "TO-DO Task",
        }
    ]
  })
});

function RouteComponent() {
  const [searchValue, setSearchValue] = useState("");
  const todos = useTodos();

  // Filter todos based on search value
  const filteredTodos = todos.filter((todo) => {
    if (!searchValue.trim()) return true;
    const searchTerm = searchValue.toLowerCase();
    return (
      todo.title.toLowerCase().includes(searchTerm) ||
      (todo.description && todo.description.toLowerCase().includes(searchTerm))
    );
  });

  const grouped = groupByStatus(filteredTodos);

  return (
    <>
      <Header>
        <HeaderTitle>TO-DO App</HeaderTitle>
      </Header>
      <main className="px-4 pt-4 pb-16 space-y-5">
        <div className="relative">
          <div className="absolute inset-y-0 flex justify-center w-8 h-full items-center">
            <SearchIcon className="size-3.5 text-primary" />
          </div>
          <Input
            size="large"
            className="pl-8.5"
            placeholder="Search To-Do"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        {/* todos  */}
        {filteredTodos.length === 0 ? (
          <div className="flex items-center bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-[3px] px-4 py-2.5 gap-4">
            <InfoIcon className="size-5 shrink-0 " />
            <p>
              {searchValue.trim()
                ? `No todos found matching "${searchValue}".`
                : "No todos found. Please add some todos."}
            </p>
          </div>
        ) : (
          <Accordion.Root type="multiple" className="space-y-3">
            {STATUS_CONFIG.map(({ status, label }) => {
              const items = grouped[status];
              if (!items.length) return null;

              return (
                <Accordion.Item value={status} key={status}>
                  <Accordion.Trigger className="h-9 group rounded-[3px] bg-secondary cursor-pointer hover:bg-primary/10 transition-colors text-xs flex justify-between gap-8 w-full px-3.5 py-2.5 outline-0 focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-1">
                    <span>
                      {label} (<span className="font-bold">{items.length}</span>
                      )
                    </span>
                    <ChevronDownIcon className="size-4 transition-transform group-aria-expanded:rotate-180" />
                  </Accordion.Trigger>
                  <Accordion.Content className=" divide-y divide-input data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
                    <div className="py-2 5">
                      {items.map((todo) => (
                        <Todo key={todo.id} todo={todo} />
                      ))}
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              );
            })}
          </Accordion.Root>
        )}

        {/* add todo  */}
        <div className="fixed max-w-xl pointer-events-none mx-auto bottom-0 inset-x-0 flex justify-end pe-5 pb-5">
          <Link
            to="/add"
            aria-label="Add new todo"
            className="size-17.5 aspect-square rounded-full pointer-events-auto bg-primary hover:bg-primary/95 text-white flex items-center justify-center outline-0 focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-1"
          >
            <PlusIcon className="size-6" />
          </Link>
        </div>
      </main>
    </>
  );
}

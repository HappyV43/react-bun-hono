import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3 className="text-3xl font-bold my-4">Created by bronwyn</h3>
      <p>
        This is my first full stack application that i made. inspiration by Sam
        Meech-Ward i learned alot in his tutorial like
      </p>
      <ol>
        <li>React TSX</li>
        <li>React Router, React Query</li>
        <li>Bun-Hono</li>
        <li>RPC</li>
        <li>Zod</li>
        <li>drizzle-orm</li>
      </ol>
    </div>
  );
}

import { hc } from "hono/client";
import { type ApiRoutes } from "../../../server/app";
import { queryOptions } from "@tanstack/react-query";
import { type CreateExpense } from "../../../server/sharedType";

const client = hc<ApiRoutes>("/");

export const api = client.api;

const getCurrentUser = async () => {
  const res = await api.me.$get();
  if (!res.ok) {
    throw new Error("Server error");
  }
  const data = await res.json();
  return data;
};

export const userQueryOptions = queryOptions({
  queryKey: ["get-current-user"],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});

export const getAllExpenses = async () => {
  const res = await api.expenses.$get();
  if (!res.ok) {
    throw new Error("Server error");
  }
  const data = await res.json();
  return data;
};

export const getAllExpensesQueryOptions = queryOptions({
  queryKey: ["get-all-expenses"],
  queryFn: getAllExpenses,
  staleTime: 1000 * 60 * 5,
});

export const createExpense = async ({ value }: { value: CreateExpense }) => {
  // Do something with form data
  await new Promise((r) => setTimeout(r, 3000));
  const res = await api.expenses.$post({ json: value });
  if (!res.ok) {
    throw new Error("Server error");
  }
  const newExpense = await res.json();
  return newExpense;
};

export const loadingCreateExpenseQueryOptions = queryOptions<{
  expense?: CreateExpense;
}>({
  queryKey: ["loading-create-expense"],
  queryFn: async () => {
    return {};
  },
  staleTime: Infinity,
});

export async function deleteExpense({ id }: { id: number }) {
  await new Promise((r) => setTimeout(r, 3000));
  const res = await api.expenses[":id{[0-9]+}"].$delete({
    param: { id: id.toString() },
  });

  if (!res.ok) {
    throw new Error("server error");
  }
}

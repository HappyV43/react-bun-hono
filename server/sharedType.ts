import { insertExpenseSchema } from "./db/schema/expenses";
import { z } from "zod";

export const createExpenseSchema = insertExpenseSchema.omit({
  userId: true,
  createdAt: true,
  id: true,
});

export type CreateExpense = z.infer<typeof createExpenseSchema>;

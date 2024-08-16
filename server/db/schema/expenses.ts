import {
  text,
  pgTable,
  serial,
  numeric,
  index,
  timestamp,
  date,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const expenses = pgTable(
  "expenses",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    title: text("title").notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    date: date("data").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (expenses) => {
    return {
      userIdIndex: index("name_idx").on(expenses.userId),
    };
  }
);

// Schema for inserting a user - can be used to validate API requests
export const insertExpenseSchema = createInsertSchema(expenses, {
  title: z.string().min(3, "Title must be at least 3 char"),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Amount must be a valid monetary value",
  }),
});
// Schema for selecting a user - can be used to validate API responses
export const selectExpenseSchema = createSelectSchema(expenses);

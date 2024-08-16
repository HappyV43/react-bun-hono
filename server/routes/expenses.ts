import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

import { getUser } from "../kinde";

import { db } from "../db";
import {
  expenses as expensesTable,
  insertExpenseSchema,
} from "../db/schema/expenses";
import { desc, eq, sum, and } from "drizzle-orm";

import { createExpenseSchema } from "../sharedType";

export const expensesRoutes = new Hono()
  .get("/", getUser, async (c) => {
    const user = c.var.user;
    const expenses = await db
      .select()
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .orderBy(desc(expensesTable.createdAt))
      .limit(100);
    return c.json({ expenses: expenses });
  })

  .get(
    "/:id{[0-9]+}",
    getUser,
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const id = Number.parseInt(c.req.param("id"));
      const user = c.var.user;
      const expenses = await db
        .select()
        .from(expensesTable)
        .where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, id)))
        .orderBy(desc(expensesTable.createdAt))
        .then((res) => res[0]);

      if (!expenses) return c.notFound();

      return c.json({ expenses });
    }
  )

  .get("/total-spend", getUser, async (c) => {
    const user = c.var.user;
    const result = await db
      .select({ total: sum(expensesTable.amount) })
      .from(expensesTable)
      .where(eq(expensesTable.userId, user.id))
      .limit(1)
      .then((res) => res[0]);
    return c.json(result);
  })

  .post("/", getUser, zValidator("json", createExpenseSchema), async (c) => {
    // Validasi request body menggunakan schema yang telah ditentukan
    const expense = await c.req.valid("json");

    // Mendapatkan user dari middleware sebelumnya
    const user = c.get("user");

    const validatedExpense = insertExpenseSchema.parse({
      ...expense,
      userId: user.id,
    });

    // Melakukan operasi insert ke dalam database
    const result = await db
      .insert(expensesTable)
      .values(validatedExpense)
      .returning()
      .then((res) => res[0]);

    // Mengatur status response menjadi 201 (Created)
    c.status(201);
    return c.json(result);
  })

  .delete(
    "/:id{[0-9]+}",
    getUser,
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const id = Number.parseInt(c.req.param("id"));

      const user = c.var.user;

      const expenses = await db
        .delete(expensesTable)
        .where(and(eq(expensesTable.userId, user.id), eq(expensesTable.id, id)))
        .returning()
        .then((res) => res[0]);

      if (!expenses) return c.notFound();

      return c.json({ expense: expenses });
    }
  );

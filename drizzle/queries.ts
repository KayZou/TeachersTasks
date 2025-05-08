// queries.ts
import { db } from ".";
import { columns, tasks } from "./schema";
const delay = 3000;
export async function getColumns() {
  await new Promise((resolve) => setTimeout(resolve, delay));
  return await db.select().from(columns).orderBy(columns.order);
}

export async function getTasks() {
  await new Promise((resolve) => setTimeout(resolve, delay));
  return await db.select().from(tasks).orderBy(tasks.order);
}

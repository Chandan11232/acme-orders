import { pool } from "./db.js";

export async function listOrders(customerId) {
  const { rows } = await pool.query(
    "SELECT id, total_cents, status, created_at FROM orders WHERE customer_id = $1 ORDER BY created_at DESC",
    [customerId],
  );
  return rows;
}

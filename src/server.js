import http from "node:http";
import { listOrders } from "./orders.js";

http
  .createServer(async (req, res) => {
    const match = req.url.match(/^\/customers\/(\d+)\/orders$/);
    if (!match) return res.writeHead(404).end();
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify(await listOrders(Number(match[1]))));
  })
  .listen(3000);

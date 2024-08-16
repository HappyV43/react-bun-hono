import app from "./app";

Bun.serve({
  fetch: app.fetch,
  port: process.env.PORT || 3000,
  hostname: "0.0.0.0",
});

console.log("server running");

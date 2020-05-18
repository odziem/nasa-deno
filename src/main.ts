import * as log from "https://deno.land/std/log/mod.ts";

import { Application, send } from "https://deno.land/x/oak/mod.ts";

import api from "./api.ts";

// Setup application logger
await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler("DEBUG"),
  }
});

const PORT = Number(Deno.env.get("PORT")) || 8000;

const app = new Application();

// Error handler middleware
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.body = "Internal server error";
    log.error(err);
  }
});

// Serve RESTful API
app.use(api.routes());
app.use(api.allowedMethods());

// Serve static files
app.use(async (ctx) => {
  const filePath = ctx.request.url.pathname;
  log.info(`Requesting ${filePath}`);
  if (["/index.html", "/javascripts/script.js", "/stylesheets/style.css", "/images/favicon.png"].includes(filePath)) {
    await send(ctx, ctx.request.url.pathname, {
      root: `${Deno.cwd()}/public`,
    });
  }
});

if (import.meta.main) {
  log.info(`Starting server on port ${PORT}...`);
  await app.listen({ port: PORT });
}

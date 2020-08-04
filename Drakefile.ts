import { desc, task, sh, run } from "https://deno.land/x/drake@v1.2.6/mod.ts";

desc("Run API");
task("start", [], async function () {
  await sh(
    "PORT=8000 deno run --allow-env --allow-net --allow-read src/mod.ts",
  );
});

desc("Run API via denon for development");
task("denon", [], async function () {
  await sh(
    "PORT=8000 denon run --allow-env --allow-net --allow-read src/mod.ts",
  );
});

desc("Cache and lock dependencies");
task("cache", [], async function () {
  await sh(
    "deno cache --lock=lock.json --lock-write src/mod.ts",
  );
});

desc("Install denon for development");
task("denon-install", [], async function () {
  await sh("deno install -Af --unstable https://deno.land/x/denon/denon.ts");
});

run();

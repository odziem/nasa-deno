FROM hayd/deno:alpine-1.0.0

WORKDIR /home/app

# Prefer not to run as root.
USER deno

# Cache the dependencies as a layer (this is re-run only when deps.ts is modified).
# Ideally this will download and compile _all_ external files used in main.ts.
COPY src/deps.ts /app
RUN deno cache src/deps.ts

# These steps will be re-run upon each file change in your working directory:
COPY . /home/app/
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache src/main.ts

# These are passed as deno arguments when run with docker:
CMD ["run", "--allow-env", "--allow-net", "--allow-read", "src/main.ts"]

EXPOSE 8000
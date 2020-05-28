# NASA Mission Control Deno Project

## Installation

1. Ensure you have Deno installed: https://deno.land/
2. In the terminal, run: `deno run -A Drakefile.ts start`

## Development

1. Install denon: `deno run -A Drakefile.ts denon-install`
2. In the terminal, run: `deno run -A Drakefile.ts denon`

## Docker Compose

1. Ensure you have the latest version of Docker and Docker Compose installed
1. Run `docker-compose up --build api`

## Backend API

Ensure the backend is running by making a GET request to http://localhost:8000/

## Front End

Browse to the Mission Control front end at http://localhost:8000/index.html and schedule an interstellar mission launch!

## Locking Dependencies

After adding a dependency, run `deno run -A Drakefile.ts cache` to update the local module cache and create a corresponding lock file. This lock file can then be added to the repository.
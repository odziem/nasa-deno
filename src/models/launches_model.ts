import { flatMap, log } from "../deps.ts";

interface Launch {
  flightNumber: number;
  mission: string;
  rocket: string;
  customers: Array<string>;
}

const launches = new Map<number, Launch>();

async function downloadLaunchData() {
  log.info("Downloading launch data...");
  const response = await fetch("https://api.spacexdata.com/v3/launches");

  if (!response.ok) {
    log.warning("Failed to fetch SpaceX launches");
    throw new Error("Launch data download failed.");
  }

  const launchData = await response.json();


  for (const launch of launchData) {
    const payloads = launch["rocket"]["second_stage"]["payloads"];

    const customers = flatMap(payloads, (payload: any) => {
      return payload["customers"];
    });

    const flightData = {
      flightNumber: launch["flight_number"],
      mission: launch["mission_name"],
      rocket: launch["rocket"]["rocket_name"],
      customers,
    };

    launches.set(flightData.flightNumber, flightData);
  }
}

await downloadLaunchData();

export function getAll() {
  return Array.from(launches.values());
};

export function getOne(id : number) {
  if (launches.has(id)) {
    return launches.get(id);
  }

  throw new Error("Launch does not exist");
};

export function addOne (data : Launch) {
  launches.set(data.flightNumber, Object.assign(data, {
    upcoming: true,
    customers: ["Zero to Mastery", "NASA"],
  }));
};

export function removeOne(id : number) {
  const aborted = launches.get(id);
  if (aborted) {
    aborted.upcoming = false;
    aborted.success = false;
  }
  return aborted;
}


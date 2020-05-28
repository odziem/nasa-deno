import { log } from "../deps.ts";

interface Launch {
  upcoming: boolean;
  success?: boolean;
  flightNumber: number;
  launchDate: number;
  mission: string;
  rocket: string;
  target?: string;
  customers: string[];
}

const launches = new Map<number, Launch>();

async function downloadLaunchData() {
  const response = await fetch("https://api.spacexdata.com/v3/launches");

  if (!response.ok) {
    return log.warning("Failed to fetch SpaceX launches");
  }

  const launchData = await response.json();

  log.info("Downloading launch data...");
  launches.clear();

  for (const launch of launchData) {
    const customers = launch["rocket"]["second_stage"]["payloads"].reduce((acc : string[], curr : any) => {
      return acc.concat(curr["customers"]);;
    }, []);

    launches.set(launch["flight_number"], {
      upcoming: launch["upcoming"],
      success: launch['launch_success'],
      flightNumber: launch["flight_number"],
      launchDate: launch["launch_date_unix"],
      mission: launch["mission_name"],
      rocket: launch["rocket"]["rocket_name"],
      customers,
    });
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

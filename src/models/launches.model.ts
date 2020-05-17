import * as log from "https://deno.land/std/log/mod.ts";
const launches = new Map<number, any>();

const downloadLaunchData = async () => {
  const response = await fetch("https://api.spacexdata.com/v3/launchess");

  if (!response.ok) {
    return log.warning("Failed to fetch SpaceX launches");
  }

  const launchData = await response.json();

  log.info("Downloading launch data...");
  launches.clear();

  for (const launch of launchData) {
    launches.set(launch["flight_number"], launch);
  }
}

await downloadLaunchData();

export const getAll = () => {
  return Array.from(launches.values());
};

export const getOne = (id : number) => {
  if (launches.has(id)) {
    return launches.get(id);
  }
};

export const addOne = (data : object) => {
  console.log('data', data);
  launches.set(launches.size + 1, data);
};

export const removeOne = async (id : number) => {
  return launches.delete(id);
}


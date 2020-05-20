import { log, join, parse, BufReader } from "../deps.ts";

interface Planet {
  keplerName: string,
  planetaryRadius: number,
  planetCount: number,
  stellarRadius: number,
  stellarMass: number,
  stellarTemperature: number,
}

const planets = new Map<string, Planet>();

async function loadPlanetData() {
  const path = join(".", "data", "kepler_exoplanets_nasa.csv");
  
  const file = await Deno.open(path);
  const bufReader = new BufReader(file);
  
  log.info("Loading planet data...");
  const result = await parse(bufReader, {
    header: true,
    comment: "#",
  });

  // Close file resource id (rid) to avoid leaking resources.
  Deno.close(file.rid);

  const matches = result.filter((item : any) => {
    return item["koi_disposition"] === "CONFIRMED" 
      && item["koi_steff"] > 5200 && item["koi_steff"] < 6200
      && item["koi_srad"] > 0.9 && item["koi_srad"] < 1.1
      && item["koi_smass"] > 0.9 && item["koi_smass"] < 1.1;
  });

  matches.forEach((item : any) => {
    planets.set(item["rowid"], {
      keplerName: item["kepler_name"],
      planetaryRadius: item["koi_prad"],
      planetCount: item["koi_count"],
      stellarMass: item["koi_smass"],
      stellarRadius: item["koi_srad"],
      stellarTemperature: item["koi_steff"],
    });
  });
}

await loadPlanetData();

export function getAll() {
  return Array.from(planets.values());
};

export function getOne(id : string) {
  if (planets.has(id)) {
    return planets.get(id);
  }
};
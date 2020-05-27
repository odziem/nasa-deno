import { pick, log, join, parse, BufReader } from "../deps.ts";

interface Planet {
  [ key : string ] : string
};

let planets : Array<Planet>;

export async function loadPlanetData() {
  log.info("Loading planet data...");
  
  const path = join(".", "data", "kepler_exoplanets_nasa.csv");

  const file = await Deno.open(path);
  const bufReader = new BufReader(file);
  
  const result = await parse(bufReader, {
    header: true,
    comment: "#",
  });

  // Close file resource id (rid) to avoid leaking resources.
  Deno.close(file.rid);

  const planets = (result as Array<Planet>).filter((planet) => {
    const planetaryRadius = Number(planet["koi_prad"]);
    const stellarRadius = Number(planet["koi_srad"]);
    const stellarMass = Number(planet["koi_smass"]);

    return planet["koi_disposition"] === "CONFIRMED" 
      && planetaryRadius > 0.5 && planetaryRadius < 1.5
      && stellarRadius > 0.98 && stellarRadius < 1.02
      && stellarMass > 0.78 && stellarMass < 1.04;
  });

  return planets.map((planet) => {
    return pick(planet, [
      "kepler_name",
      "koi_prad",
      "koi_smass",
      "koi_srad",
      "koi_count",
      "koi_steff"
    ]);
  })
}

planets = await loadPlanetData();
log.info(JSON.stringify(planets, null, 2));

export function getAll() {
  return planets;
};
/**
 * Deno includes:
 * 
 * 1. The test runner in the CLI.
 * 2. Assertions in the standard library.
 * 3. Built-in test fixtures with Deno.test().
 */

import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import { filterHabitablePlanets } from "./planets.ts";

const FALSE_POSITIVE = {
  koi_disposition: "FALSE POSITIVE",
};

const PLANET_RADIUS_TOO_LARGE = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1.5",
  koi_srad: "1",
  koi_smass: "1",
};

const STAR_RADIUS_TOO_LARGE = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1.02",
  koi_smass: "1",
};

const STAR_MASS_TOO_SMALL = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1",
  koi_smass: "0.78",
};

const HABITABLE_PLANET = {
  koi_disposition: "CONFIRMED",
  koi_prad: "1",
  koi_srad: "1",
  koi_smass: "1",
};

Deno.test("match only habitable planets", () => {
  const filtered = filterHabitablePlanets([
    FALSE_POSITIVE,
    PLANET_RADIUS_TOO_LARGE,
    STAR_RADIUS_TOO_LARGE,
    STAR_MASS_TOO_SMALL,
    HABITABLE_PLANET
  ]);

  assertEquals(filtered, [
    HABITABLE_PLANET,
  ]);
});
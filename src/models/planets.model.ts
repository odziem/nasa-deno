import * as csv from "https://deno.land/std/encoding/csv.ts";
import { BufReader } from "https://deno.land/std/io/bufio.ts";

const planets = new Map<string, any>();

const loadPlanetData = async () => {
  const file = await Deno.open("./src/models/planet-data/kepler-exoplanets-nasa.csv");
  const bufReader = new BufReader(file);
  
  const result = await csv.parse(bufReader, {
    header: ["rowid", "kepid", "kepoi_name", "kepler_name", "koi_disposition", "koi_vet_stat", "koi_vet_date", "koi_pdisposition", "koi_score", "koi_fpflag_nt", "koi_fpflag_ss", "koi_fpflag_co", "koi_fpflag_ec", "koi_disp_prov", "koi_comment", "koi_period", "koi_time0bk", "koi_time0", "koi_eccen", "koi_longp", "koi_impact", "koi_duration", "koi_ingress", "koi_depth", "koi_ror", "koi_srho", "koi_fittype", "koi_prad", "koi_sma", "koi_incl", "koi_teq", "koi_insol", "koi_dor", "koi_limbdark_mod", "koi_ldm_coeff4", "koi_ldm_coeff3", "koi_ldm_coeff2", "koi_ldm_coeff1", "koi_parm_prov", "koi_max_sngle_ev", "koi_max_mult_ev", "koi_model_snr", "koi_count", "koi_num_transits", "koi_tce_plnt_num", "koi_tce_delivname", "koi_quarters", "koi_bin_oedp_sig", "koi_trans_mod", "koi_model_dof", "koi_model_chisq", "koi_datalink_dvr", "koi_datalink_dvs", "koi_steff", "koi_slogg", "koi_smet", "koi_srad", "koi_smass", "koi_sage", "koi_sparprov", "ra", "dec", "koi_kepmag", "koi_gmag", "koi_rmag", "koi_imag", "koi_zmag", "koi_jmag", "koi_hmag", "koi_kmag", "koi_fwm_stat_sig", "koi_fwm_sra", "koi_fwm_sdec", "koi_fwm_srao", "koi_fwm_sdeco", "koi_fwm_prao", "koi_fwm_pdeco", "koi_dicco_mra", "koi_dicco_mdec", "koi_dicco_msky", "koi_dikco_mra", "koi_dikco_mdec", "koi_dikco_msky"],
    comment: "#",
  });

  result.forEach((item : any) => {
    planets.set(item["rowid"], {
      objectCode: item["kepoi_name"],
      keplerName: item["kepler_name"],
      orbitalPeriod: item["koi_period"],
      planetaryRadius: item["koi_prad"],
      planetCount: item["koi_count"],
      stellarRadius: item["koi_srad"],
      stellarMass: item["koi_smass"],
      rightAscension: item["ra"],
      declination: item["dec"],
    });
  });
}

await loadPlanetData();

export const getAll = () => {
  return Array.from(planets.values());
};

export const getOne = (id : string) => {
  if (planets.has(id)) {
    return planets.get(id);
  }
};
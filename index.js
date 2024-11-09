import fetch from "node-fetch";

const FORM_URL =
  "https://ipag.osug.fr/french/grand-public/soirees-d-observation-du-ciel-en-hiver/formulaire-inscription-coupole-ipag/";
const NOT_YET_OPEN_MESSAGE =
  "Les réservations  pour la saison 2024-2025 ouvriront sur cette page à la mi Novembre 2024";

console.info(`Fetching '${FORM_URL}'…`);
const response = await fetch(FORM_URL);
const content = await response.text();
console.debug(`The page contains '${content.slice(0, 256)}[...]'`);

const is_open = !content.includes(NOT_YET_OPEN_MESSAGE);
console.log(`Registrations are open: ${is_open}`);

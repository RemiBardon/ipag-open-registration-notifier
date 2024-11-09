import fetch from "node-fetch";

const FORM_URL =
  "https://ipag.osug.fr/french/grand-public/soirees-d-observation-du-ciel-en-hiver/formulaire-inscription-coupole-ipag/";

console.info(`Fetching '${FORM_URL}'…`);
const response = await fetch(FORM_URL);
const content = await response.text();
console.debug(`The page contains '${content.slice(0, 256)}[...]'`);

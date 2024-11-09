import fetch from "node-fetch";
import { JSDOM } from "jsdom";

const FORM_URL =
  "https://ipag.osug.fr/french/grand-public/soirees-d-observation-du-ciel-en-hiver/formulaire-inscription-coupole-ipag/";
const NOT_YET_OPEN_MESSAGE =
  "Les réservations  pour la saison 2024-2025 ouvriront sur cette page à la mi Novembre 2024";
const SELECT_ELEMENT_ID = "#champ_selection_1";
const PLACEHOLDER_OPTION_TEXT = "Plus aucune places disponible désolé";

console.info(`Fetching '${FORM_URL}'…`);
const response = await fetch(FORM_URL);
const content = await response.text();
console.debug(`The page contains '${content.slice(0, 256)}[...]'`);

const is_open = !content.includes(NOT_YET_OPEN_MESSAGE);
console.log(`Registrations are open: ${is_open}`);

const dom = new JSDOM(content);
const document = dom.window.document;

const slots = document.querySelectorAll(`${SELECT_ELEMENT_ID} option`);
const available_slots = Array.from(slots).filter(
  (option) => option.textContent.trim() !== PLACEHOLDER_OPTION_TEXT,
);

if (available_slots.length <= 0) {
  console.log(`No slot available.`);
} else {
  console.log(`${available_slots.length} slot(s) available.`);
}

import fetch from "node-fetch";
import { JSDOM } from "jsdom";

/**
 * Checks that an environment variable is well defined.
 * @param {string} varName - Name of the environment variable.
 */
function checkEnvVar(varName) {
  if (!process.env[varName]) {
    throw new Error(`Missing the \`${varName}\` environment variable.`);
  }
}
checkEnvVar("MAILGUN_API_KEY");
checkEnvVar("MAILGUN_DOMAIN");
checkEnvVar("EMAIL_SENDER");
checkEnvVar("EMAIL_RECIPIENTS");

const FORM_URL =
  "https://ipag.osug.fr/french/grand-public/soirees-d-observation-du-ciel-en-hiver/formulaire-inscription-coupole-ipag/";
const NOT_YET_OPEN_MESSAGE =
  "Les réservations  pour la saison 2024-2025 ouvriront sur cette page à la mi Novembre 2024";
const SELECT_ELEMENT_ID = "#champ_selection_1";
const PLACEHOLDER_OPTION_TEXT = "Plus aucune places disponible désolé";

const EMAIL_FROM = process.env.EMAIL_SENDER;
const EMAIL_TO = process.env.EMAIL_RECIPIENTS.split(",");

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
  // Exit gracefully
  process.exit(0);
} else {
  console.log(`${available_slots.length} slot(s) available.`);
}

// See [Node.js SDK Reference | Mailgun Developer Documentation](https://documentation.mailgun.com/docs/mailgun/sdk/nodejs_sdk/).
import formData from "form-data";
import Mailgun from "mailgun.js";

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
  url: process.env.MAILGUN_API_URL || "https://api.mailgun.net",
});

mg.messages
  .create(process.env.MAILGUN_DOMAIN, {
    from: EMAIL_FROM,
    to: EMAIL_TO,
    subject: "Les inscriptions sont ouvertes ! 🔭",
    text: `Les inscriptions pour les Soirées d’Observation du ciel en Hiver de l’IPAG ont ouvert, vas vite sur le formulaire d’inscription (${FORM_URL}) !`,
    html: `Les inscriptions pour les Soirées d’Observation du ciel en Hiver de l’IPAG ont ouvert, vas vite sur <a href="${FORM_URL}">le formulaire d’inscription</a> !`,
  })
  .then((msg) => console.log(msg)) // logs response data
  .catch((err) => console.error(err)); // logs any error

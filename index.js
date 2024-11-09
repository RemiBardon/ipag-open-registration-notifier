const FORM_URL =
  "https://ipag.osug.fr/french/grand-public/soirees-d-observation-du-ciel-en-hiver/formulaire-inscription-coupole-ipag/";

/**
 * Fetches a web page and returns its content.
 * @param {string} url - The web page URL.
 * @returns {string} The web page content.
 */
function fetch(url) {
  console.log(`Fetching '${url}'…`);
  return "todo";
}

const content = fetch(FORM_URL);
console.log(`The page contains '${content}'`);

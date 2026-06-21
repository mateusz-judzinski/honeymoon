import { loadTemplate } from '../utils.js';

export async function initSilverTier(container) {
    container.innerHTML = await loadTemplate('./game/silver/silver.html');
    // Tu w przyszłości podepniemy logikę koła fortuny (np. nasłuchiwanie kliknięcia w przycisk "Kręć")
}
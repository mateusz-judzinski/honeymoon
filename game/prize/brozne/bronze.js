import { loadTemplate } from '../utils.js';

export async function initBronzeTier(container) {
    container.innerHTML = await loadTemplate('./game/bronze/bronze.html');
    // Tu w przyszłości podepniemy logikę otwierania skrzyni
}
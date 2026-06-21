import { loadTemplate } from '../../../utils.js';

export async function initSilverTier(container) {
    // Dodajemy folder 'prize' do ścieżki
    container.innerHTML = await loadTemplate('./game/prize/silver/silver.html');
    // Tu w przyszłości podepniemy logikę koła fortuny
}
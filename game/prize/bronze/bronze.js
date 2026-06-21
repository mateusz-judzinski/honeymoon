import { loadTemplate } from '../../../utils.js';

export async function initBronzeTier(container) {
    // Dodajemy folder 'prize' do ścieżki
    container.innerHTML = await loadTemplate('./game/prize/bronze/bronze.html');
    // Tu w przyszłości podepniemy logikę otwierania skrzyni
}
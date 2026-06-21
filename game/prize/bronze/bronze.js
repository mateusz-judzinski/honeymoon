import { loadTemplate } from '../../../utils.js';

export async function initBronzeTier(container) {
    container.innerHTML = await loadTemplate('./game/prize/bronze/bronze.html');
}
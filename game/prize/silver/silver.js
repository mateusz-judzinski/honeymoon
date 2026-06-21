import { loadTemplate } from '../../../utils.js';

export async function initSilverTier(container) {
    container.innerHTML = await loadTemplate('./game/prize/silver/silver.html');
}
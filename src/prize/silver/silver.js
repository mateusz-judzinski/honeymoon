import { loadTemplate } from '../../../utils.js';

export async function initSilverTier(container) {
    container.innerHTML = await loadTemplate('./src/prize/silver/silver.html');
}
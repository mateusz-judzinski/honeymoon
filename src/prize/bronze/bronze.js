import { loadTemplate } from '../../../utils.js';

export async function initBronzeTier(container) {
    container.innerHTML = await loadTemplate('./src/prize/bronze/bronze.html');
}
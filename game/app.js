import { initGoldTier } from './game/gold/gold.js';
import { initSilverTier } from './game/silver/silver.js';
import { initBronzeTier } from './game/bronze/bronze.js';
import { loadTemplate } from './game/utils.js';

document.addEventListener("DOMContentLoaded", async () => {
    const appContainer = document.getElementById("app");

    const TARGET_DATE = new Date(2027, 2, 1);
    const CURRENT_DATE = new Date();

    // Ścieżka względem index.html
    if (CURRENT_DATE < TARGET_DATE) {
        appContainer.innerHTML = await loadTemplate('./lock.html');
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const tier = urlParams.get("tier");

    appContainer.innerHTML = '';

    switch (tier) {
        case "gold":
            await initGoldTier(appContainer);
            break;
        case "silver":
            await initSilverTier(appContainer);
            break;
        case "bronze":
            await initBronzeTier(appContainer);
            break;
        default:
            // Ładowanie wydzielonego pliku błędu
            appContainer.innerHTML = await loadTemplate('./error.html');
    }
});
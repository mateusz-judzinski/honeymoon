import { initGoldTier } from './prize/gold/gold.js';
import { initSilverTier } from './prize/silver/silver.js';
import { initBronzeTier } from './prize/bronze/bronze.js';
import { loadTemplate } from './utils.js';
import { initLock } from './lock.js';

document.addEventListener("DOMContentLoaded", async () => {
    const appContainer = document.getElementById("app");

    // TODO: adjust target date when finished
    const TARGET_DATE = new Date(2027, 2, 1);
    const CURRENT_DATE = new Date();

    if (CURRENT_DATE < TARGET_DATE) {
        appContainer.innerHTML = await loadTemplate('./src/lock.html');
        initLock();
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
            appContainer.innerHTML = await loadTemplate('./src/error.html');
    }
});
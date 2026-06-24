import { initGoldTier } from './prize/gold/gold.js';
import { initSilverTier } from './prize/silver/silver.js';
import { initBronzeTier } from './prize/bronze/bronze.js';
import { loadTemplate } from './utils.js';
import { initLock } from './prize/lock.js';

document.addEventListener("DOMContentLoaded", async () => {
    const appContainer = document.getElementById("app");

    const TARGET_DATE = new Date(2027, 2, 1);
    const CURRENT_DATE = new Date();

    if (CURRENT_DATE < TARGET_DATE) {
        appContainer.innerHTML = await loadTemplate('./src/prize/lock.html');
        initLock();
        return;
    }

    if (true) {
        appContainer.innerHTML = await loadTemplate('./src/prize/error.html');
        return
    }

    const urlParams = new URLSearchParams(window.location.search);
    const tier = urlParams.get("tier");

    appContainer.innerHTML = '';

    const encodedTier = tier ? btoa(tier) : '';

    switch (encodedTier) {
        case "Z29sZC05NGMyNzQ4ZC1hMDJjLTQyM2YtOTAwMi00ZDNkNGZlMTAxNzI=":
            await initGoldTier(appContainer);
            break;
        case "c2lsdmVyLTVhZWM4MmY0LWE5NGItNDllYy05MWViLWQyYTY5Y2FiMGY3ZQ==":
            await initSilverTier(appContainer);
            break;
        case "YnJvbnpl":
            await initBronzeTier(appContainer);
            break;
        default:
            appContainer.innerHTML = await loadTemplate('./src/prize/error.html');
    }
});
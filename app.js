document.addEventListener("DOMContentLoaded", () => {
    const appContainer = document.getElementById("app");

    // UWAGA DO TESTÓW: Miesiące w JS są indeksowane od 0 (0 = styczeń, 2 = marzec).
    // Jeśli chcesz przetestować gry TERAZ, zmień rok na 2025.
    const TARGET_DATE = new Date(2026, 2, 1); // 1 marca 2027
    const CURRENT_DATE = new Date();

    function renderLockScreen() {
        appContainer.innerHTML = `
            <div class="p-8 text-center flex flex-col items-center justify-center h-full">
                <div class="text-7xl mb-6">🛑</div>
                <h1 class="text-3xl font-bold text-red-600 mb-4">Zakaz Wstępu!</h1>
                <p class="text-slate-600 mb-6 text-lg">
                    Podróż poślubna jeszcze się nie zaczęła! <br>
                    Strefa nagród jest zablokowana.
                </p>
                <div class="bg-red-50 text-red-800 px-6 py-3 rounded-xl border border-red-200 font-semibold shadow-inner">
                    Wróćcie po 1 marca 2027!
                </div>
            </div>
        `;
    }

    function renderErrorScreen() {
        appContainer.innerHTML = `
            <div class="p-8 text-center">
                <h1 class="text-2xl font-bold text-slate-800 mb-2">Brak nagrody</h1>
                <p class="text-slate-600">Zeskanowano nieprawidłowy kod QR.</p>
            </div>
        `;
    }

    // 1. Sprawdzenie zabezpieczenia czasowego
    if (CURRENT_DATE < TARGET_DATE) {
        renderLockScreen();
        return; // Zatrzymujemy dalsze wykonywanie kodu
    }

    // 2. Odczytanie parametru "tier" z adresu URL
    const urlParams = new URLSearchParams(window.location.search);
    const tier = urlParams.get("tier");

    appContainer.innerHTML = ''; // Czyszczenie kontenera

    // 3. Uruchomienie odpowiedniej minigry
    switch (tier) {
        case "gold":
            initGoldTier(appContainer);
            break;
        case "silver":
            initSilverTier(appContainer);
            break;
        case "bronze":
            initBronzeTier(appContainer);
            break;
        default:
            renderErrorScreen();
    }
});
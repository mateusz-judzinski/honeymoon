// Globalna funkcja odpalająca konfetti
function triggerConfetti() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FF8C00'] // Złote kolory
    });
}

// ==========================================
// ZŁOTY POZIOM: ZDRAPKA
// ==========================================
function initGoldTier(container) {
    container.innerHTML = `
        <div class="p-6 text-center w-full">
            <h2 class="text-3xl font-bold text-yellow-500 mb-2">Złota Nagroda!</h2>
            <p class="text-slate-500 mb-8 text-sm">Zdrap szarą powierzchnię, aby odkryć swój prezent.</p>

            <div class="relative w-64 h-64 mx-auto cursor-crosshair select-none">
                <div class="absolute inset-0 bg-yellow-50 rounded-2xl border-4 border-yellow-400 flex flex-col items-center justify-center p-4 shadow-inner">
                    <span class="text-5xl mb-3">🍿</span>
                    <span class="font-bold text-yellow-700 text-xl leading-tight">Voucher do kina z zestawem przekąsek!</span>
                </div>

                <canvas id="scratch-canvas" class="absolute inset-0 rounded-2xl touch-none shadow-md"></canvas>
            </div>
        </div>
    `;

    const canvas = document.getElementById("scratch-canvas");
    const ctx = canvas.getContext("2d");

    // Dopasowanie rozmiarów płótna (musi odpowiadać wielkości diva w CSS)
    canvas.width = 256;
    canvas.height = 256;

    // Wypełnienie "farbą" zdrapki
    ctx.fillStyle = "#9ca3af"; // Szary kolor
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dodanie napisu na zdrapce
    ctx.fillStyle = "#4b5563";
    ctx.font = "bold 24px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("ZDRAP MNIE", canvas.width / 2, canvas.height / 2);

    let isDrawing = false;
    let isRevealed = false;

    function scratch(e) {
        if (!isDrawing || isRevealed) return;

        const rect = canvas.getBoundingClientRect();
        // Obsługa zarówno myszki jak i palca (dotyk)
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // Tryb wymazywania (zamienia narysowane piksele na przezroczyste)
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2); // promień "pędzla" = 25
        ctx.fill();

        checkReveal();
    }

    function checkReveal() {
        // Analiza pikseli (czy usunięto odpowiednio dużo szarego tła)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let transparentPixels = 0;

        // Co 4 wartość w tablicy imageData to kanał Alpha (przezroczystość)
        for (let i = 3; i < imageData.data.length; i += 4) {
            if (imageData.data[i] === 0) transparentPixels++;
        }

        const clearPercentage = transparentPixels / (canvas.width * canvas.height);

        // Jeśli zdrapano 60% powierzchni, zdejmujemy resztę z animacją
        if (clearPercentage > 0.6 && !isRevealed) {
            isRevealed = true;
            canvas.style.transition = "opacity 0.5s ease-out";
            canvas.style.opacity = "0";

            setTimeout(() => {
                canvas.remove(); // Usunięcie elementu z DOM
                triggerConfetti(); // Boom!
            }, 500);
        }
    }

    // Podpięcie zdarzeń myszy
    canvas.addEventListener("mousedown", () => isDrawing = true);
    document.addEventListener("mouseup", () => isDrawing = false);
    canvas.addEventListener("mousemove", scratch);

    // Podpięcie zdarzeń dotykowych (smartfony)
    canvas.addEventListener("touchstart", (e) => {
        isDrawing = true;
        e.preventDefault(); // Blokuje przewijanie ekranu w trakcie zdrapywania
    });
    document.addEventListener("touchend", () => isDrawing = false);
    canvas.addEventListener("touchmove", (e) => {
        scratch(e);
        e.preventDefault();
    }, { passive: false });
}

// ==========================================
// SREBRNY POZIOM: KOŁO FORTUNY (ZALĄŻEK)
// ==========================================
function initSilverTier(container) {
    container.innerHTML = `
        <div class="p-6 text-center w-full">
            <h2 class="text-3xl font-bold text-slate-400 mb-4">Srebrna Nagroda</h2>
            <p>Tu zakodujemy Koło Fortuny!</p>
        </div>
    `;
}

// ==========================================
// BRĄZOWY POZIOM: SKRZYNIA (ZALĄŻEK)
// ==========================================
function initBronzeTier(container) {
    container.innerHTML = `
        <div class="p-6 text-center w-full">
            <h2 class="text-3xl font-bold text-amber-700 mb-4">Brązowa Nagroda</h2>
            <p>Tu zakodujemy Skrzynię ze Skarbem!</p>
        </div>
    `;
}
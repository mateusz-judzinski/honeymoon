import { triggerConfetti, loadTemplate } from '../../../utils.js';

export async function initGoldTier(container) {
    container.innerHTML = await loadTemplate('./game/prize/gold/gold.html');

    const canvas = document.getElementById("scratch-canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 256;
    canvas.height = 256;

    ctx.fillStyle = "#9ca3af";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.fill();

        checkReveal();
    }

    function checkReveal() {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let transparentPixels = 0;

        for (let i = 3; i < imageData.data.length; i += 4) {
            if (imageData.data[i] === 0) transparentPixels++;
        }

        const clearPercentage = transparentPixels / (canvas.width * canvas.height);

        if (clearPercentage > 0.6 && !isRevealed) {
            isRevealed = true;
            canvas.style.transition = "opacity 0.5s ease-out";
            canvas.style.opacity = "0";

            setTimeout(() => {
                canvas.remove();
                triggerConfetti();
            }, 500);
        }
    }

    canvas.addEventListener("mousedown", () => isDrawing = true);
    document.addEventListener("mouseup", () => isDrawing = false);
    canvas.addEventListener("mousemove", scratch);

    canvas.addEventListener("touchstart", (e) => {
        isDrawing = true;
        e.preventDefault();
    });
    document.addEventListener("touchend", () => isDrawing = false);
    canvas.addEventListener("touchmove", (e) => {
        scratch(e);
        e.preventDefault();
    }, { passive: false });
}
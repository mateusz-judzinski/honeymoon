import { triggerConfetti, loadTemplate } from '../../utils.js';

export async function initSilverTier(container) {
    container.innerHTML = await loadTemplate('./src/prize/silver/silver.html');

    const canvas = document.getElementById('wheel-canvas');
    const ctx = canvas.getContext('2d');
    const spinBtn = document.getElementById('spin-btn');
    const resultContainer = document.getElementById('silver-result');
    const prizeText = document.getElementById('silver-prize-text');

    canvas.width = 300;
    canvas.height = 300;

    const decodeBase64 = (str) => new TextDecoder().decode(Uint8Array.from(atob(str), c => c.charCodeAt(0)));

    const secretPrize = "WndpZWR6YW5pZSBvcmF6IGRlZ3VzdGFjamE=";
    const encryptedSegments = ["S2lubw==", "U3Bh", "U3VzaGk=", "V2lubmljYQ==", "QnVuZ2Vl", "QmFzZW4="];
    const segments = encryptedSegments.map(decodeBase64);

    const colors = ["#f8fafc", "#e2e8f0", "#cbd5e1", "#94a3b8", "#64748b", "#475569"];
    const winningIndex = 3;

    let currentAngle = 0;
    let isSpinning = false;

    function drawWheel() {
        const arc = Math.PI * 2 / segments.length;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < segments.length; i++) {
            const angle = currentAngle + i * arc;

            ctx.beginPath();
            ctx.fillStyle = colors[i];
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, angle, angle + arc);
            ctx.fill();

            ctx.save();
            ctx.translate(
                canvas.width / 2 + Math.cos(angle + arc / 2) * (canvas.width / 2 - 45),
                canvas.height / 2 + Math.sin(angle + arc / 2) * (canvas.height / 2 - 45)
            );
            ctx.rotate(angle + arc / 2);
            ctx.fillStyle = i >= 4 ? "#ffffff" : "#1e293b";
            ctx.font = "bold 16px sans-serif";
            ctx.textAlign = "right";
            ctx.fillText(segments[i], 0, 5);
            ctx.restore();
        }
    }

    function spinWheel() {
        if (isSpinning) return;
        isSpinning = true;

        const arc = Math.PI * 2 / segments.length;
        const spinDuration = 4500;
        const startAngle = currentAngle;

        const targetRotation = (Math.PI * 2 * 6) - (winningIndex * arc) - (arc / 2) - (Math.PI / 2);

        const startTime = performance.now();

        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / spinDuration, 1);

            const easeOut = 1 - Math.pow(1 - progress, 4);

            currentAngle = startAngle + targetRotation * easeOut;
            drawWheel();

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                currentAngle = currentAngle % (Math.PI * 2);
                showResult();
            }
        }

        requestAnimationFrame(animate);
    }

    function showResult() {
        spinBtn.style.display = "none";
        resultContainer.classList.remove("hidden");
        resultContainer.classList.add("flex");

        setTimeout(() => {
            resultContainer.style.opacity = "1";
            prizeText.innerText = decodeBase64(secretPrize);
            triggerConfetti();
        }, 50);
    }

    drawWheel();
    spinBtn.addEventListener('click', spinWheel);
}
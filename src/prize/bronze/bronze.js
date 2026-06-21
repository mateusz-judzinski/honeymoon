import { triggerConfetti, loadTemplate } from '../../utils.js';

export async function initBronzeTier(container) {
    container.innerHTML = await loadTemplate('./src/prize/bronze/bronze.html');

    const chestContainer = document.getElementById('chest-container');
    const closedChest = document.getElementById('closed-chest');
    const openedChest = document.getElementById('opened-chest');
    const prizeText = document.getElementById('bronze-prize-text');

    const secretPrize = "Vm91Y2hlciBuYSBkcmluZWN6ZWsh";

    let isOpened = false;

    chestContainer.addEventListener('click', () => {
        if (isOpened) return;
        isOpened = true;

        closedChest.style.transform = "scale(1.1) rotate(5deg)";

        setTimeout(() => {
            closedChest.style.opacity = "0";
            closedChest.style.visibility = "hidden";

            openedChest.style.opacity = "1";
            openedChest.style.transform = "scale(1)";

            prizeText.innerText = atob(secretPrize);

            triggerConfetti();
        }, 300);
    });
}
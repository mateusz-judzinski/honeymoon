export function triggerConfetti() {
    window.confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FF8C00']
    });
}

export async function loadTemplate(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Błąd ładowania szablonu: ${response.status}`);
        return await response.text();
    } catch (error) {
        console.error(error);
        return `<div class="p-4 text-red-500">Błąd krytyczny: Nie udało się wczytać widoku.</div>`;
    }
}
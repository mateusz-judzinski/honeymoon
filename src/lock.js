export function initLock() {
    let secondsLeft = 30;

    const timerDisplay = document.getElementById('countdown-timer');
    const lockIcon = document.getElementById('lock-icon');
    const lockTitle = document.getElementById('lock-title');
    const lockMessage = document.getElementById('lock-message');
    const lockScreen = document.getElementById('lock-screen');
    const alarmSound = document.getElementById('alarm-sound');
    const explosionSound = document.getElementById('explosion-sound');

    if (!timerDisplay) return;

    const playPromise = alarmSound.play();
    if (playPromise !== undefined) {
        playPromise.catch(() => {
            document.body.addEventListener('click', () => {
                if (secondsLeft > 0) alarmSound.play();
            }, { once: true });
        });
    }

    const countdown = setInterval(() => {
        secondsLeft--;

        const seconds = secondsLeft % 60;
        timerDisplay.textContent = `00:${seconds < 10 ? '0' : ''}${seconds}`;

        if (secondsLeft <= 10) {
            lockIcon.classList.remove('animate-pulse');
            lockIcon.classList.add('animate-ping', 'text-red-500');
            lockScreen.classList.add('bg-red-950');
        }

        if (secondsLeft <= 0) {
            clearInterval(countdown);
            triggerExplosion();
        }
    }, 1000);

    function triggerExplosion() {
        alarmSound.pause();
        explosionSound.play().catch(() => {});

        lockScreen.classList.remove('bg-red-950');
        lockScreen.classList.add('bg-black');

        lockIcon.classList.remove('animate-ping', 'animate-pulse');
        lockIcon.classList.add('text-9xl');

        lockIcon.textContent = "💥";
        lockTitle.textContent = "KABOOM! No i brawo...";
        lockTitle.classList.remove('text-amber-400');
        lockTitle.classList.add('text-white');

        lockMessage.innerHTML = `
            <div class="text-left space-y-4 text-red-200 bg-red-900/30 p-6 rounded-xl border border-red-700">
                <p class="font-bold text-2xl text-center">🤯 Jedna nagroda właśnie wyparowała.</p>
                <p>Ostrzegaliśmy. Przez Wasze wścibstwo system Travel-Safe™ zdetonował pierwszą niespodziankę w kopercie.</p>
                <p class="font-semibold">Co teraz?</p>
                <ul class="list-disc list-inside text-sm space-y-1 text-slate-300">
                    <li>Wróć tu dopiero, gdy wykonasz wszystkie zdjęcia podczas podróży.</li>
                    <li>Każde kolejne wejście przed czasem grozi reakcją łańcuchową i wybuchem reszty nagród.</li>
                    <li>Ryzykujecie powrót z podróży z pustymi rękami (i fochem systemu).</li>
                </ul>
                <p class="text-center pt-4 italic text-xs text-slate-500">Widzimy się w marcu 2027. Bez odbioru.</p>
            </div>
        `;
    }
}
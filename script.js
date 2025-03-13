// Puzzle Logic
document.addEventListener('DOMContentLoaded', () => {
    const puzzleArea = document.getElementById('puzzle-area');
    const hintButton = document.getElementById('hint-button');
    const restartButton = document.getElementById('restart-button');

    let pieces = [];
    let moves = 0;
    let startTime;
    let timerInterval;

    const createPuzzle = () => {
        puzzleArea.innerHTML = '';
        pieces = [];
        moves = 0;
        startTime = Date.now();

        // Create pieces
        for (let i = 0; i < 9; i++) {
            const piece = document.createElement('div');
            piece.classList.add('puzzle-piece');
            piece.textContent = i + 1;
            piece.setAttribute('data-index', i);
            piece.draggable = true;

            pieces.push(piece);
            puzzleArea.appendChild(piece);
        }

        // Shuffle pieces
        shufflePieces();

        // Start Timer
        startTimer();

        // Drag/Drop Setup
        pieces.forEach(piece => {
            piece.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', piece.getAttribute('data-index'));
            });

            piece.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            piece.addEventListener('drop', (e) => {
                e.preventDefault();
                const fromIndex = e.dataTransfer.getData('text/plain');
                const toIndex = piece.getAttribute('data-index');

                swapPieces(fromIndex, toIndex);
                moves++;
            });
        });
    };

    const shufflePieces = () => {
        pieces.sort(() => Math.random() - 0.5);
        pieces.forEach((piece, index) => {
            piece.style.order = index;
        });
    };

    const swapPieces = (fromIndex, toIndex) => {
        const temp = pieces[fromIndex].textContent;
        pieces[fromIndex].textContent = pieces[toIndex].textContent;
        pieces[toIndex].textContent = temp;
    };

    const startTimer = () => {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
            document.getElementById('timer').textContent = `${timeElapsed}s`;
        }, 1000);
    };

    // Hint Button
    hintButton.addEventListener('click', () => {
        alert('Hint: Match the pieces in order.');
    });

    // Restart Button
    restartButton.addEventListener('click', createPuzzle);

    // Initialize Game
    createPuzzle();
});

let timerId;
let timeLeft = 60;
let correctPieces = 0;
const totalPieces = 9;

// Start Button
document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
});

// Start Timer
function startTimer() {
    timerId = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = 
            `${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(timeLeft % 60).padStart(2, '0')}`;

        if (timeLeft <= 0) {
            clearInterval(timerId);
            showResult(false);
        }
    }, 1000);
}

// Show Result
function showResult(isWin) {
    const popup = document.getElementById(isWin ? 'win-popup' : 'lose-popup');
    const sound = document.getElementById(isWin ? 'win-sound' : 'lose-sound');
    popup.style.display = 'block';
    sound.play();
}

// Create Puzzle
function createPuzzle(image) {
    const stage = new Konva.Stage({
        container: 'puzzle-container',
        width: 500,
        height: 500
    });

    const layer = new Konva.Layer();
    const tileSize = 500 / 3;

    let pieces = [];

    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            let tile = new Konva.Image({
                image,
                crop: {
                    x: x * tileSize,
                    y: y * tileSize,
                    width: tileSize,
                    height: tileSize
                },
                x: Math.random() * 400,
                y: Math.random() * 400,
                draggable: true
            });

            tile.on('dragend', () => {
                correctPieces++;
                if (correctPieces === 9) showResult(true);
            });

            layer.add(tile);
        }
    }

    stage.add(layer);
    startTimer();
}

// File Upload
document.getElementById('photoUpload').addEventListener('change', (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => createPuzzle(img);
        img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
});

let timeLeft = 60;
let timerId;
let correctPieces = 0;
const totalPieces = 9;

// Initialize Konva Stage
const stage = new Konva.Stage({
    container: 'puzzle-container',
    width: 500,
    height: 500,
});

// Timer Function
function startTimer() {
    timerId = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = 
            `${String(Math.floor(timeLeft/60)).padStart(2, '0')}:${String(timeLeft%60).padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(timerId);
            showResult(false);
        }
    }, 1000);
}

// Check Win Condition
function checkWin() {
    correctPieces++;
    if (correctPieces === totalPieces) {
        clearInterval(timerId);
        showResult(true);
    }
}

// Show Result
function showResult(isWin) {
    const popup = document.getElementById(isWin ? 'win-popup' : 'lose-popup');
    const sound = document.getElementById(isWin ? 'win-sound' : 'lose-sound');
    
    popup.style.display = 'block';
    sound.play();
}

// Create Puzzle
function createPuzzle(image, gridSize = 3) {
    const layer = new Konva.Layer();
    const tileSize = 500 / gridSize;
    let positions = [];

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            positions.push({ x: j * tileSize, y: i * tileSize });
        }
    }

    positions = positions.sort(() => Math.random() - 0.5);

    positions.forEach((pos, index) => {
        const tile = new Konva.Image({
            image: image,
            crop: {
                x: (index % gridSize) * tileSize,
                y: Math.floor(index / gridSize) * tileSize,
                width: tileSize,
                height: tileSize,
            },
            width: tileSize,
            height: tileSize,
            draggable: true,
            x: pos.x,
            y: pos.y
        });

        tile.on('dragend', () => {
            checkWin();
        });

        layer.add(tile);
    });

    stage.add(layer);
    startTimer();
}

document.getElementById('photoUpload').addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
        const image = new Image();
        image.onload = () => createPuzzle(image);
        image.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

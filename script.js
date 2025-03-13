const stage = new Konva.Stage({
    container: 'puzzle-container',
    width: 400,
    height: 400,
});

document.getElementById('start-button').addEventListener('click', () => {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
});

let timer;
let correctPieces = 0;
const totalPieces = 9;

function startTimer() {
    let timeLeft = 60;
    const timerElement = document.getElementById('timer');
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `00:${String(timeLeft).padStart(2, '0')}`;
        if (timeLeft === 0) {
            clearInterval(timer);
            showResult(false);
        }
    }, 1000);
}

function showResult(win) {
    document.getElementById(win ? 'win-popup' : 'lose-popup').style.display = 'block';
    document.getElementById(win ? 'win-sound' : 'lose-sound').play();
}

function createPuzzle(image) {
    const layer = new Konva.Layer();
    const size = 400 / 3;
    let positions = [...Array(9).keys()].map(i => ({
        x: (i % 3) * size,
        y: Math.floor(i / 3) * size
    }));

    positions = positions.sort(() => Math.random() - 0.5);

    positions.forEach((pos, i) => {
        const tile = new Konva.Image({
            image,
            x: pos.x,
            y: pos.y,
            width: size,
            height: size,
            crop: {
                x: (i % 3) * size,
                y: Math.floor(i / 3) * size,
                width: size,
                height: size
            },
            draggable: true,
        });

        tile.on('dragend', () => {
            if (tile.x() === pos.x && tile.y() === pos.y) {
                correctPieces++;
                if (correctPieces === totalPieces) showResult(true);
            }
        });

        layer.add(tile);
    });

    stage.add(layer);
    startTimer();
}

document.getElementById('photoUpload').addEventListener('change', e => {
    const reader = new FileReader();
    reader.onload = ev => {
        const img = new Image();
        img.src = ev.target.result;
        img.onload = () => createPuzzle(img);
    };
    reader.readAsDataURL(e.target.files[0]);
});

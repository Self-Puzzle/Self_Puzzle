let pieces = [];
let timer;
let seconds = 0;

document.getElementById('upload').addEventListener('change', handleImage);

function handleImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => createPuzzle(e.target.result);
    reader.readAsDataURL(file);
  }
}

function createPuzzle(imgSrc) {
  clearInterval(timer);
  seconds = 0;
  document.getElementById('timer').textContent = "00:00";

  pieces = [];
  const container = document.getElementById('puzzle-container');
  container.innerHTML = '';

  for (let i = 0; i < 9; i++) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.backgroundImage = `url(${imgSrc})`;
    piece.style.backgroundPosition = `${-100 * (i % 3)}px ${-100 * Math.floor(i / 3)}px`;
    piece.dataset.index = i;
    piece.draggable = true;

    piece.addEventListener('dragstart', handleDragStart);
    piece.addEventListener('dragover', handleDragOver);
    piece.addEventListener('drop', handleDrop);

    pieces.push(piece);
    container.appendChild(piece);
  }

  shufflePieces();
  startTimer();
  playBackgroundAudio();
}

function shufflePieces() {
  pieces.sort(() => Math.random() - 0.5);
  const container = document.getElementById('puzzle-container');
  container.innerHTML = '';
  pieces.forEach((piece) => container.appendChild(piece));
}

function handleDragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.dataset.index);
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDrop(event) {
  const fromIndex = event.dataTransfer.getData('text/plain');
  const toIndex = event.target.dataset.index;

  const fromPiece = pieces[fromIndex];
  const toPiece = pieces[toIndex];

  pieces[fromIndex] = toPiece;
  pieces[toIndex] = fromPiece;

  const container = document.getElementById('puzzle-container');
  container.innerHTML = '';
  pieces.forEach((piece) => container.appendChild(piece));
}

function startTimer() {
  timer = setInterval(() => {
    seconds++;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    document.getElementById('timer').textContent = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, 1000);
}

function playBackgroundAudio() {
  const audio = document.getElementById('background-audio');
  audio.play().catch((e) => console.error('Audio play failed:', e));
}

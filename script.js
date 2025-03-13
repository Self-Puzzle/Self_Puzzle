document.addEventListener('DOMContentLoaded', () => {
  const puzzleArea = document.getElementById('puzzle-area');
  const hintButton = document.getElementById('hint-button');
  const restartButton = document.getElementById('restart-button');
  const successSound = document.getElementById('success-sound');
  const dragSound = document.getElementById('drag-sound');

  const pieces = [];
  let moves = 0;

  // Generate puzzle pieces
  const generatePuzzle = () => {
    puzzleArea.innerHTML = '';
    moves = 0;
    for (let i = 1; i <= 16; i++) {
      const piece = document.createElement('div');
      piece.classList.add('puzzle-piece');
      piece.textContent = i;
      piece.setAttribute('draggable', true);

      piece.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', i);
        dragSound.play();
      });

      piece.addEventListener('dragover', (e) => e.preventDefault());

      piece.addEventListener('drop', (e) => {
        e.preventDefault();
        const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
        const toIndex = parseInt(piece.textContent);
        swapPieces(fromIndex, toIndex);
      });

      pieces.push(piece);
      puzzleArea.appendChild(piece);
    }
  };

  // Swap pieces
  const swapPieces = (from, to) => {
    const fromPiece = pieces.find((p) => parseInt(p.textContent) === from);
    const toPiece = pieces.find((p) => parseInt(p.textContent) === to);

    if (fromPiece && toPiece) {
      const temp = fromPiece.textContent;
      fromPiece.textContent = toPiece.textContent;
      toPiece.textContent = temp;
      successSound.play();
      moves++;
    }
  };

  // Hint button
  hintButton.addEventListener('click', () => {
    alert('Hint: Align the pieces in numeric order.');
  });

  // Restart button
  restartButton.addEventListener('click', () => {
    generatePuzzle();
  });

  // Initialize game
  generatePuzzle();
});

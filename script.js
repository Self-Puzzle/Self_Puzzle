// Puzzle Logic
document.addEventListener('DOMContentLoaded', () => {
  const puzzleArea = document.getElementById('puzzle-area');
  const hintButton = document.getElementById('hint-button');
  const restartButton = document.getElementById('restart-button');
  const leaderboardList = document.getElementById('leaderboard-list');

  let moves = 0;
  let timer;
  let startTime;

  // Generate Puzzle Pieces
  const generatePuzzle = () => {
    puzzleArea.innerHTML = '';
    const pieces = Array.from({ length: 9 }, (_, i) => i + 1);

    // Shuffle pieces
    pieces.sort(() => Math.random() - 0.5);

    pieces.forEach((number) => {
      const piece = document.createElement('div');
      piece.classList.add('puzzle-piece');
      piece.textContent = number;
      piece.draggable = true;

      // Drag & Drop events
      piece.addEventListener('dragstart', handleDragStart);
      piece.addEventListener('dragover', handleDragOver);
      piece.addEventListener('drop', handleDrop);

      puzzleArea.appendChild(piece);
    });

    startTimer();
    moves = 0;
  };

  // Timer Logic
  const startTimer = () => {
    startTime = Date.now();
    timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      console.log(`Time: ${elapsed}s`);
    }, 1000);
  };

  // Drag and Drop Logic
  let draggedPiece = null;

  function handleDragStart(event) {
    draggedPiece = event.target;
    event.dataTransfer.setData('text/plain', draggedPiece.textContent);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    if (!draggedPiece) return;

    const targetPiece = event.target;
    const temp = draggedPiece.textContent;

    draggedPiece.textContent = targetPiece.textContent;
    targetPiece.textContent = temp;

    moves++;
    checkWin();
  }

  // Check for Win
  const checkWin = () => {
    const pieces = Array.from(puzzleArea.children);
    const isCorrect = pieces.every((piece, index) => parseInt(piece.textContent) === index + 1);

    if (isCorrect) {
      clearInterval(timer);
      alert(`You solved it in ${moves} moves!`);
      updateLeaderboard(moves);
    }
  };

  // Update Leaderboard
  const updateLeaderboard = (score) => {
    const listItem = document.createElement('li');
    listItem.textContent = `Solved in ${score} moves`;
    leaderboardList.appendChild(listItem);
  };

  // Restart Button
  restartButton.addEventListener('click', () => {
    generatePuzzle();
  });

  // Hint Button
  hintButton.addEventListener('click', () => {
    alert('Hint: Arrange the pieces in numerical order.');
  });

  // Start the Game
  generatePuzzle();
});

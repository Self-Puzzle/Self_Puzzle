document.addEventListener('DOMContentLoaded', () => {
  const puzzleArea = document.getElementById('puzzle-area');
  const hintButton = document.getElementById('hint-button');
  const restartButton = document.getElementById('restart-button');

  // Generate Puzzle Pieces
  const generatePuzzle = () => {
    puzzleArea.innerHTML = '';
    let order = [...Array(9).keys()].sort(() => Math.random() - 0.5);

    order.forEach((num) => {
      const piece = document.createElement('div');
      piece.classList.add('puzzle-piece');
      piece.textContent = num + 1;
      piece.draggable = true;

      // Drag & Drop
      piece.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', num);
      });

      piece.addEventListener('drop', (e) => {
        e.preventDefault();
        let draggedIndex = e.dataTransfer.getData('text/plain');
        let targetIndex = order.indexOf(num);

        [order[draggedIndex], order[targetIndex]] = [
          order[targetIndex],
          order[draggedIndex],
        ];

        generatePuzzle();
        checkWin(order);
      });

      piece.addEventListener('dragover', (e) => e.preventDefault());

      puzzleArea.appendChild(piece);
    });
  };

  // Check Winning Condition
  const checkWin = (order) => {
    if (order.every((val, idx) => val === idx)) {
      alert('You Won!');
      updateLeaderboard();
    }
  };

  // Update Leaderboard
  const updateLeaderboard = () => {
    const leaderboard = document.getElementById('leaderboard-list');
    leaderboard.innerHTML += `<li>${new Date().toLocaleTimeString()} - Completed</li>`;
  };

  // Hint Button
  hintButton.addEventListener('click', () => {
    alert('Hint: Align the pieces in numerical order.');
  });

  // Restart Button
  restartButton.addEventListener('click', () => generatePuzzle());

  // Initialize Game
  generatePuzzle();
});

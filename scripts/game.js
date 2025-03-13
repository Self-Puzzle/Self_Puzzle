class CyberPuzzle {
  constructor() {
    this.puzzleArea = document.getElementById('puzzle-area');
    this.pieces = [];
    this.moves = 0;
    this.errors = 0;
    this.startTime = null;
    this.timerInterval = null;
    this.draggedPiece = null;
    this.init();
  }

  init() {
    this.generatePuzzle(3);
    this.setupEventListeners();
    this.startTimer();
  }

  generatePuzzle(size) {
    this.puzzleArea.innerHTML = '';
    this.pieces = [];
    const pieceSize = 500 / size;

    for(let i = 0; i < size * size; i++) {
      const piece = document.createElement('div');
      piece.className = 'puzzle-piece';
      piece.style.width = `${pieceSize}px`;
      piece.style.height = `${pieceSize}px`;
      piece.dataset.correctPosition = i;
      piece.textContent = i + 1;
      
      // Set random initial position
      piece.style.left = `${Math.random() * (500 - pieceSize)}px`;
      piece.style.top = `${Math.random() * (500 - pieceSize)}px`;
      
      this.pieces.push(piece);
      this.puzzleArea.appendChild(piece);
      new HologramEffect(piece);
    }
  }

  setupEventListeners() {
    document.getElementById('hint-button').addEventListener('click', () => {
      this.showHint();
    });

    document.getElementById('restart-button').addEventListener('click', () => {
      this.restartGame();
    });

    this.pieces.forEach(piece => {
      piece.addEventListener('mousedown', e => {
        this.draggedPiece = piece;
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
      });
    });
  }

  handleMouseMove = (e) => {
    if(!this.draggedPiece) return;
    
    const rect = this.puzzleArea.getBoundingClientRect();
    const x = e.clientX - rect.left - this.draggedPiece.offsetWidth/2;
    const y = e.clientY - rect.top - this.draggedPiece.offsetHeight/2;
    
    this.draggedPiece.style.left = `${Math.max(0, Math.min(x, 500 - this.draggedPiece.offsetWidth))}px`;
    this.draggedPiece.style.top = `${Math.max(0, Math.min(y, 500 - this.draggedPiece.offsetHeight))}px`;
  }

  handleMouseUp = () => {
    if(!this.draggedPiece) return;
    
    this.moves++;
    document.getElementById('moves').textContent = this.moves;
    
    if(!this.checkPosition(this.draggedPiece)) {
      this.errors++;
      document.getElementById('errors').textContent = this.errors;
      playErrorSound();
    }
    
    this.draggedPiece = null;
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
    
    if(this.checkVictory()) this.handleVictory();
  }

  checkPosition(piece) {
    const correctX = (piece.dataset.correctPosition % 3) * (500/3);
    const correctY = Math.floor(piece.dataset.correctPosition / 3) * (500/3);
    const currentX = parseFloat(piece.style.left);
    const currentY = parseFloat(piece.style.top);
    
    return Math.abs(currentX - correctX) < 15 && Math.abs(currentY - correctY) < 15;
  }

  checkVictory() {
    return this.pieces.every(piece => this.checkPosition(piece));
  }

  handleVictory() {
    const timeTaken = (Date.now() - this.startTime) / 1000;
    document.getElementById('time-taken').textContent = timeTaken.toFixed(2);
    document.getElementById('mistakes-made').textContent = this.errors;
    document.getElementById('victory-screen').classList.remove('hidden');
    
    playVictorySound();
    addScoreToLeaderboard(timeTaken, this.errors);
    fetchLeaderboard();
  }

  startTimer() {
    this.startTime = Date.now();
    this.timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
      document.getElementById('timer').textContent = 
        `${String(Math.floor(elapsed / 60)).padStart(2, '0')}:${String(elapsed % 60).padStart(2, '0')}`;
    }, 1000);
  }

  restartGame() {
    clearInterval(this.timerInterval);
    this.generatePuzzle(3);
    this.moves = 0;
    this.errors = 0;
    document.getElementById('moves').textContent = '0';
    document.getElementById('errors').textContent = '0';
    document.getElementById('victory-screen').classList.add('hidden');
    this.startTimer();
  }

  showHint() {
    // Implementation for hint system
  }
}

// Initialize game
window.addEventListener('load', () => {
  const game = new CyberPuzzle();
});

const audioContext = new (window.AudioContext || window.webkitAudioContext))();

// Background music
const bgMusic = new Audio('assets/bg-music.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.3;

// Sound generators
const createPulseSound = (frequency = 440, type = 'square') => {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  
  gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.5);
};

// Game sounds
const playErrorSound = () => {
  createPulseSound(220, 'sawtooth');
  createPulseSound(110, 'sine');
};

const playVictorySound = () => {
  [523.25, 659.25, 783.99].forEach((freq, i) => {
    setTimeout(() => createPulseSound(freq, 'sine'), i * 150);
  });
};

// Initialize audio
document.addEventListener('click', () => {
  audioContext.resume();
  bgMusic.play();
}, { once: true });

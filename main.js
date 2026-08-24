// URL da Spritesheet (ajuste para o caminho do arquivo)
const SPRITE_URL = 'clapping.jpg';

// Dimensões originais de cada frame na grade (32 colunas x 8 linhas)
const CONFIG = {
  cols: 32,
  rows: 8,
  frameWidth: 64,   // Largura nativa do frame
  frameHeight: 64,  // Altura nativa do frame
  scale: 4,         // Renderiza 4x maior no palco (256x256 px)
  fps: 24
};

// 1. Instância do Personagem Principal
const player = new SpriteAnimator({
  target: '#player-sprite',
  imageUrl: SPRITE_URL,
  cols: CONFIG.cols,
  rows: CONFIG.rows,
  frameWidth: CONFIG.frameWidth,
  frameHeight: CONFIG.frameHeight,
  scale: CONFIG.scale,
  fps: CONFIG.fps
});

// 2. Instância do Fantasma / Rastro de Movimento (Atrasado em 3 frames)
const ghost = new SpriteAnimator({
  target: '#player-ghost',
  imageUrl: SPRITE_URL,
  cols: CONFIG.cols,
  rows: CONFIG.rows,
  frameWidth: CONFIG.frameWidth,
  frameHeight: CONFIG.frameHeight,
  scale: CONFIG.scale,
  fps: CONFIG.fps,
  frameOffset: -3
});

// --- Controles de Interface (HUD) ---

// Troca de Direção / Linha
document.getElementById('select-dir').addEventListener('change', (e) => {
  const dir = Number(e.target.value);
  player.setDirection(dir);
  ghost.setDirection(dir);
});

// Ajuste de Escala em Tempo Real
const scaleSlider = document.getElementById('scale-slider');
const scaleValue = document.getElementById('scale-value');
scaleSlider.addEventListener('input', (e) => {
  const scale = Number(e.target.value);
  scaleValue.textContent = `${scale}x`;
  player.setScale(scale);
  ghost.setScale(scale);
});

// Ajuste de FPS
const fpsSlider = document.getElementById('fps-slider');
const fpsValue = document.getElementById('fps-value');
fpsSlider.addEventListener('input', (e) => {
  const fps = Number(e.target.value);
  fpsValue.textContent = `${fps} FPS`;
  player.setFps(fps);
  ghost.setFps(fps);
});

// Play / Pause
const btnPlayPause = document.getElementById('btn-play-pause');
btnPlayPause.addEventListener('click', () => {
  if (player.isPlaying) {
    player.pause();
    ghost.pause();
    btnPlayPause.textContent = 'Play';
  } else {
    player.play();
    ghost.play();
    btnPlayPause.textContent = 'Pausar';
  }
});

// Toggle Aura Rúnica
const runeCircle = document.querySelector('.rune-circle');
document.getElementById('btn-toggle-aura').addEventListener('click', () => {
  runeCircle.style.opacity = runeCircle.style.opacity === '0' ? '1' : '0';
});

// Toggle Rastro / After-image
const ghostElement = document.getElementById('player-ghost');
document.getElementById('btn-toggle-ghost').addEventListener('click', () => {
  ghostElement.style.opacity = ghostElement.style.opacity === '0' ? '0.45' : '0';
});

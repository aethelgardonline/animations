// Instanciando múltiplos personagens a partir da spritesheet
const char1 = new SpriteAnimator({
  target: '#character-1',
  imageUrl: 'clapping.png', // Caminho da spritesheet
  cols: 32,                 // 32 frames horizontais
  rows: 8,                  // 8 variações / ângulos verticais
  frameWidth: 64,           // Ajuste conforme a largura exata de 1 frame em px
  frameHeight: 64,          // Ajuste conforme a altura exata de 1 frame em px
  fps: 24,
  scale: 1.5                // Upscaling sem perder o traço
});

const char2 = new SpriteAnimator({
  target: '#character-2',
  imageUrl: 'clapping.png',
  cols: 32,
  rows: 8,
  frameWidth: 64,
  frameHeight: 64,
  fps: 18,
  scale: 1.5
});

// Define direções e estados independentes
char2.setDirection(3);

/**
 * SpriteEngine Core - Suporte a Grid Spritesheets com escala, FPS e After-Images
 */
class SpriteAnimator {
  constructor({
    target,
    imageUrl,
    cols = 32,
    rows = 8,
    frameWidth = 64,
    frameHeight = 64,
    fps = 24,
    autoPlay = true,
    loop = true,
    scale = 4,
    direction = 0,
    frameOffset = 0
  }) {
    this.container = typeof target === 'string' ? document.querySelector(target) : target;
    this.imageUrl = imageUrl;
    this.cols = cols;
    this.rows = rows;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.fps = fps;
    this.loop = loop;
    this.scale = scale;
    this.currentRow = direction;
    this.frameOffset = frameOffset; // Permite dessincronizar o rastro fantasma

    this.currentCol = 0;
    this.isPlaying = false;
    this.lastFrameTime = 0;
    this.animFrameId = null;

    this.init();
    if (autoPlay) this.play();
  }

  init() {
    this.updateDimensions();
    this.container.style.backgroundImage = `url("${this.imageUrl}")`;
    this.container.style.backgroundRepeat = 'no-repeat';
    this.updateFrame();
  }

  updateDimensions() {
    const w = this.frameWidth * this.scale;
    const h = this.frameHeight * this.scale;
    this.container.style.width = `${w}px`;
    this.container.style.height = `${h}px`;
    this.container.style.backgroundSize = `${this.cols * w}px ${this.rows * h}px`;
  }

  updateFrame() {
    // Aplica o frame com suporte a offset para rastros
    const targetCol = (this.currentCol + this.frameOffset + this.cols) % this.cols;
    const x = -(targetCol * this.frameWidth * this.scale);
    const y = -(this.currentRow * this.frameHeight * this.scale);
    this.container.style.backgroundPosition = `${x}px ${y}px`;
  }

  tick(time) {
    if (!this.isPlaying) return;

    const interval = 1000 / this.fps;
    const delta = time - this.lastFrameTime;

    if (delta >= interval) {
      this.lastFrameTime = time - (delta % interval);
      this.currentCol++;

      if (this.currentCol >= this.cols) {
        if (this.loop) {
          this.currentCol = 0;
        } else {
          this.currentCol = this.cols - 1;
          this.pause();
          return;
        }
      }
      this.updateFrame();
    }

    this.animFrameId = requestAnimationFrame((t) => this.tick(t));
  }

  play() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.lastFrameTime = performance.now();
    this.animFrameId = requestAnimationFrame((t) => this.tick(t));
  }

  pause() {
    this.isPlaying = false;
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
  }

  setDirection(rowIndex) {
    if (rowIndex >= 0 && rowIndex < this.rows) {
      this.currentRow = rowIndex;
      this.updateFrame();
    }
  }

  setScale(newScale) {
    this.scale = newScale;
    this.updateDimensions();
    this.updateFrame();
  }

  setFps(newFps) {
    this.fps = newFps;
  }
}

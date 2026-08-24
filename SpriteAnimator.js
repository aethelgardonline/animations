/**
 * SpriteAnimator - Engine leve para spritesheets matriciais (linhas x colunas)
 */
class SpriteAnimator {
  constructor({
    target,
    imageUrl,
    cols = 32,
    rows = 8,
    frameWidth,
    frameHeight,
    fps = 24,
    autoPlay = true,
    loop = true,
    scale = 1
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

    this.currentCol = 0;
    this.currentRow = 0;
    this.isPlaying = false;
    this.lastFrameTime = 0;
    this.animFrameId = null;

    this.init();
    if (autoPlay) this.play();
  }

  init() {
    this.container.style.width = `${this.frameWidth * this.scale}px`;
    this.container.style.height = `${this.frameHeight * this.scale}px`;
    this.container.style.backgroundImage = `url(${this.imageUrl})`;
    this.container.style.backgroundRepeat = 'no-repeat';
    this.container.style.backgroundSize = `${this.cols * this.frameWidth * this.scale}px ${this.rows * this.frameHeight * this.scale}px`;
    this.updateBackground();
  }

  updateBackground() {
    const xOffset = -(this.currentCol * this.frameWidth * this.scale);
    const yOffset = -(this.currentRow * this.frameHeight * this.scale);
    this.container.style.backgroundPosition = `${xOffset}px ${yOffset}px`;
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
      this.updateBackground();
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
      this.updateBackground();
    }
  }

  setFps(newFps) {
    this.fps = newFps;
  }

  destroy() {
    this.pause();
    this.container.innerHTML = '';
  }
}

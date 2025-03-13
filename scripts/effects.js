class HologramEffect {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    this.element.style.transformStyle = 'preserve-3d';
    this.element.style.transition = 'transform 0.3s ease-out';
    this.element.addEventListener('mousemove', this.handleHover.bind(this));
    this.element.addEventListener('mouseleave', this.resetTransform.bind(this));
  }

  handleHover(e) {
    const rect = this.element.getBoundingClientRect();
    const centerX = rect.left + rect.width/2;
    const centerY = rect.top + rect.height/2;
    
    const rotateX = -(e.clientY - centerY) * 0.02;
    const rotateY = (e.clientX - centerX) * 0.02;
    
    this.element.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(20px)
    `;
  }

  resetTransform() {
    this.element.style.transform = 'perspective(1000px) translateZ(0)';
  }
}

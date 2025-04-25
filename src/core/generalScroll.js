export class GeneralScroll {
  constructor(container, options = {}) {
    if (!container) throw new Error("Container element is required");

    this.container =
      typeof container === "string"
        ? document.querySelector(container)
        : container;

    this.options = {
      speed: 50,
      autoStart: true,
      cloneNode: true,
      direction: "vertical",
      ...options,
    };

    this.state = {
      isScrolling: false,
      isPaused: false,
    };

    this.plugins = [];
    this.animationFrame = null;
    this.observer = null;
    this.init();
  }

  init() {
    if (!this.options.autoStart) return;
    this.setupContainer();
    this.setupResizeObserver();
    this.setupClones();
    this.setupListeners();
    this.runPlugins();
    this.conditionalStart();
  }
  // 设置容器滚动方向
  setupContainer() {
    const { direction } = this.options;
    this.container.style.overflow = "hidden";
    this.container.style.display = "flex";
    this.container.style.flexDirection =
      direction === "vertical" ? "column" : "row";
  }

  // 克隆子节点
  setupClones() {
    if (!this.options.cloneNode || !this.shouldScroll()) return;

    this.cleanClones();
    const children = [...this.container.children];

    children.forEach((child) => {
      const clone = child.cloneNode(true);
      clone.dataset.clone = "true";
      this.container.appendChild(clone);
    });
  }

  // 事件监听器
  setupListeners() {
    this.container.addEventListener("mouseenter", () => this.pause());
    this.container.addEventListener("mouseleave", () => this.resume());
  }

  // 监听是否执行滚动
  setupResizeObserver() {
    this.observer = new ResizeObserver((entries) => {
      if (this.shouldScroll()) {
        if (!this.state.isScrolling) this.conditionalStart();
      } else {
        if (this.state.isScrolling) this.stop();
      }
    });
    this.observer.observe(this.container);
  }

  // 监听容器变化
  shouldScroll() {
    const { direction } = this.options;
    const contentSize =
      direction === "vertical"
        ? this.container.scrollHeight
        : this.container.scrollWidth;
    const clientSize =
      direction === "vertical"
        ? this.container.clientHeight
        : this.container.clientWidth;
    return contentSize > clientSize;
  }

  // 执行滚动事件
  conditionalStart() {
    if (this.shouldScroll()) {
      this.start();
    }
  }
  // 注册插件
  runPlugins() {
    this.plugins.forEach((plugin) => plugin(this));
  }

  // 开始滚动
  start() {
    if (this.state.isScrolling) return;
    this.state.isScrolling = true;
    let lastTime = performance.now();
    let virtualScrollPos = 0;
    const animate = (timestamp) => {
      if (!this.state.isScrolling) return;

      if (!this.shouldScroll()) {
        this.stop();
        return;
      }
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      if (!this.state.isPaused) {
        const { direction, speed } = this.options;
        const axis = direction === "vertical" ? "scrollTop" : "scrollLeft";
        const contentSize =
          direction === "vertical"
            ? this.container.scrollHeight / 2
            : this.container.scrollWidth / 2;
        virtualScrollPos += (speed * deltaTime) / 16.667;
        if (virtualScrollPos >= contentSize) {
          virtualScrollPos -= contentSize;
        }
        this.container[axis] = virtualScrollPos % contentSize;
      }
      this.animationFrame = requestAnimationFrame(animate);
    };
    this.animationFrame = requestAnimationFrame(animate);
  }

  pause() {
    this.state.isPaused = true;
  }

  resume() {
    this.state.isPaused = false;
  }

  stop() {
    this.state.isScrolling = false;
    cancelAnimationFrame(this.animationFrame);
  }

  destroy() {
    this.stop();
    this.cleanClones();
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  cleanClones() {
    const clones = this.container.querySelectorAll("[data-clone]");
    clones.forEach((clone) => clone.remove());
  }

  use(plugin) {
    this.plugins.push(plugin);
    return this;
  }
}

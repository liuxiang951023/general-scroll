class h {
  constructor(t, e = {}) {
    if (!t) throw new Error("Container element is required");
    this.container = typeof t == "string" ? document.querySelector(t) : t, this.options = {
      speed: 50,
      autoStart: !0,
      cloneNode: !0,
      direction: "vertical",
      ...e
    }, this.state = {
      isScrolling: !1,
      isPaused: !1
    }, this.plugins = [], this.animationFrame = null, this.observer = null, this.init();
  }
  init() {
    this.options.autoStart && (this.setupContainer(), this.setupResizeObserver(), this.setupClones(), this.setupListeners(), this.runPlugins(), this.conditionalStart());
  }
  setupContainer() {
    const { direction: t } = this.options;
    this.container.style.overflow = "hidden", this.container.style.display = "flex", this.container.style.flexDirection = t === "vertical" ? "column" : "row";
  }
  setupClones() {
    if (!this.options.cloneNode || !this.shouldScroll()) return;
    this.cleanClones(), [...this.container.children].forEach((e) => {
      const i = e.cloneNode(!0);
      i.dataset.clone = "true", this.container.appendChild(i);
    });
  }
  setupListeners() {
    this.container.addEventListener("mouseenter", () => this.pause()), this.container.addEventListener("mouseleave", () => this.resume());
  }
  setupResizeObserver() {
    this.observer = new ResizeObserver((t) => {
      this.shouldScroll() ? this.state.isScrolling || this.conditionalStart() : this.state.isScrolling && this.stop();
    }), this.observer.observe(this.container);
  }
  shouldScroll() {
    const { direction: t } = this.options, e = t === "vertical" ? this.container.scrollHeight : this.container.scrollWidth, i = t === "vertical" ? this.container.clientHeight : this.container.clientWidth;
    return console.log(
      e,
      i,
      e > i,
      "测试滚动距离"
    ), e > i;
  }
  conditionalStart() {
    this.shouldScroll() && this.start();
  }
  runPlugins() {
    this.plugins.forEach((t) => t(this));
  }
  start() {
    if (this.state.isScrolling) return;
    this.state.isScrolling = !0;
    let t = performance.now(), e = 0;
    const i = (o) => {
      if (!this.state.isScrolling) return;
      if (!this.shouldScroll()) {
        this.stop();
        return;
      }
      const r = o - t;
      if (t = o, !this.state.isPaused) {
        const { direction: n, speed: l } = this.options, a = n === "vertical" ? "scrollTop" : "scrollLeft", c = n === "vertical" ? this.container.scrollHeight / 2 : this.container.scrollWidth / 2;
        e += l * r / 16.667, e >= c && (e -= c), this.container[a] = e % c;
      }
      this.animationFrame = requestAnimationFrame(i);
    };
    this.animationFrame = requestAnimationFrame(i);
  }
  pause() {
    this.state.isPaused = !0;
  }
  resume() {
    this.state.isPaused = !1;
  }
  stop() {
    this.state.isScrolling = !1, cancelAnimationFrame(this.animationFrame);
  }
  destroy() {
    this.stop(), this.cleanClones(), this.observer && this.observer.disconnect();
  }
  cleanClones() {
    this.container.querySelectorAll("[data-clone]").forEach((e) => e.remove());
  }
  use(t) {
    return this.plugins.push(t), this;
  }
}
const u = (s) => {
  const t = () => s.pause(), e = () => s.resume();
  s.container.addEventListener("touchstart", t), s.container.addEventListener("touchend", e);
  const i = s.destroy.bind(s);
  s.destroy = () => {
    s.container.removeEventListener("touchstart", t), s.container.removeEventListener("touchend", e), i();
  };
}, d = (s) => {
  const t = new ResizeObserver(() => {
    s.setupClones(), s.container[s.options.direction === "vertical" ? "scrollTop" : "scrollLeft"] = 0;
  });
  t.observe(s.container), s.observers.push(t);
}, p = (s) => (t) => {
  const e = t.start.bind(t);
  let i = 0, o = 0;
  t.start = function() {
    i = performance.now(), o = 0, e();
  }, t.animate, t.animate = () => {
    if (!t.state.isScrolling || t.state.isPaused) return;
    const r = performance.now(), n = r - i;
    o = Math.min(o + n / 1e3, 1);
    const l = t.options.speed * s(o), a = t.options.direction === "vertical" ? "scrollTop" : "scrollLeft";
    t.container[a] += l, i = r, t.animationFrame = requestAnimationFrame(t.animate);
  };
};
export {
  h as GeneralScroll,
  p as easingPlugin,
  d as resizePlugin,
  u as touchPlugin
};

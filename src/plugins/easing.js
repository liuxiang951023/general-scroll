export const easingPlugin = (easingFn) => (instance) => {
  const originalStart = instance.start.bind(instance);
  let lastTime = 0;
  let progress = 0;

  instance.start = function () {
    lastTime = performance.now();
    progress = 0;
    originalStart();
  };

  const originalAnimate = instance.animate;
  instance.animate = () => {
    if (!instance.state.isScrolling || instance.state.isPaused) return;

    const now = performance.now();
    const delta = now - lastTime;
    progress = Math.min(progress + delta / 1000, 1);

    const speed = instance.options.speed * easingFn(progress);
    const axis =
      instance.options.direction === "vertical" ? "scrollTop" : "scrollLeft";

    instance.container[axis] += speed;
    lastTime = now;

    instance.animationFrame = requestAnimationFrame(instance.animate);
  };
};

export const resizePlugin = (instance) => {
  const observer = new ResizeObserver(() => {
    instance.setupClones();
    instance.container[
      instance.options.direction === "vertical" ? "scrollTop" : "scrollLeft"
    ] = 0;
  });
  observer.observe(instance.container);
  instance.observers.push(observer);
};

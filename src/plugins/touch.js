export const touchPlugin = (instance) => {
  const handleTouchStart = () => instance.pause();
  const handleTouchEnd = () => instance.resume();

  instance.container.addEventListener("touchstart", handleTouchStart);
  instance.container.addEventListener("touchend", handleTouchEnd);

  const originalDestroy = instance.destroy.bind(instance);
  instance.destroy = () => {
    instance.container.removeEventListener("touchstart", handleTouchStart);
    instance.container.removeEventListener("touchend", handleTouchEnd);
    originalDestroy();
  };
};

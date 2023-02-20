const pointerLogo = () => {
  const n = process.env.MIRROR;
  return n.replace(".", "↗")
    .split()
    .map(c => c.toUpperCase())
    .join();
};

export default pointerLogo;
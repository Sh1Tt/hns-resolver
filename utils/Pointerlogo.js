const pointerLogo = () => {
  const logotext = process.env.MIRROR || "hns";
  return logotext.replace(".", "↗")
    .split()
    .map(c => c.toUpperCase())
    .join();
};

export default pointerLogo;
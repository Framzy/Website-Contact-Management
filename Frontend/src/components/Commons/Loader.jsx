export default function Loader({
  size = 48,
  color = "#ffa516",
  className = "",
}) {
  const loaderStyle = {
    width: `${size}px`,
    height: `${size}px`,
    "--loader-color": color,
  };

  return (
    <div className={`relative inline-block ${className}`} style={loaderStyle}>
      <span className="loader"></span>
    </div>
  );
}

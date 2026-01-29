export function Button({
  type = "button",
  onClick,
  label,
  style,
  className = "",
  disabled = false,
  children,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn d-flex align-items-center justify-content-center ${className}`}
      style={style}
    >
      {children || label}
    </button>
  );
}

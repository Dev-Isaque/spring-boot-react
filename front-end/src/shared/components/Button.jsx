export function Button({
  type = "button",
  onClick,
  label,
  style,
  className = "",
  disabled = false,
  children,
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn d-flex align-items-center justify-content-center ${className}`}
      style={style}
      {...props}
    >
      {children || label}
    </button>
  );
}

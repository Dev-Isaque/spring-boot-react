export function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
  className = "",
}) {
  return (
    <div className="auth-field">
      {label && <label>{label}</label>}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`form-control auth-input ${className}`}
      />
    </div>
  );
}

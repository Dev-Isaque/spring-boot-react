import { forwardRef } from "react";

export const Input = forwardRef(function Input(
  {
    label,
    type = "text",
    name,
    value,
    onChange,
    onKeyDown,
    placeholder,
    disabled = false,
    className = "",
  },
  ref,
) {
  return (
    <div className="auth-field">
      {label && <label>{label}</label>}

      <input
        ref={ref}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={`form-control auth-input ${className}`}
      />
    </div>
  );
});

import React from "react";

export default function ErrorInput(props) {
  const { error, placeholder, value, name, onChange, className, disabled } =
    props;
  return (
    <div className="dfc" style={{ width: "100%" }}>
      <input
        type="text"
        placeholder={placeholder}
        name={name}
        disabled={disabled}
        value={value}
        onChange={onChange}
        className={`color--black ${className} ${
          error === undefined ? "" : "error-border"
        }`}
      />
      {error !== undefined && <span className="error-field">{error}</span>}
    </div>
  );
}

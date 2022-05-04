import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function PasswordInput(props) {
  const [show, setShow] = useState(false);
  const { error, placeholder, value, name, onChange, className, passStrength } =
    props;
  const passLevel = ["Too weak", "Could be strong", "Strong password"];

  const checkPassStrength = () => {
    return (
      <div className="df-ac-jb">
        <div className="df-ac">
          <div
            className={`pass-strenght ${
              passStrength > 0 ? "week--active" : "weak"
            }`}
          />
          <div
            className={`pass-strenght ${passStrength >= 1 ? "average" : ""}`}
          />
          <div
            className={`pass-strenght ${passStrength === 2 ? "strong" : ""}`}
          />
        </div>
        <div className="pass-level">{passLevel[passStrength]}</div>
      </div>
    );
  };

  return (
    <div className="dfc">
      <div
        className={`df-ac-jb ${className}`}
        style={{ border: error === undefined ? "" : "1px solid #C0504D" }}
      >
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          className="pass-input"
        />
        {show ? (
          <VisibilityIcon
            fontSize="small"
            onClick={() => setShow(false)}
            className="cursor-pointer"
          />
        ) : (
          <VisibilityOffIcon
            fontSize="small"
            onClick={() => setShow(true)}
            className="cursor-pointer"
          />
        )}
      </div>
      {error !== undefined && <span className="error-field">{error}</span>}
      {passStrength !== undefined && checkPassStrength()}
    </div>
  );
}

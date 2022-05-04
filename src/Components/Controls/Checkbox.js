import {
  FormControl,
  FormControlLabel,
  Checkbox as MuiCheckbox,
} from "@mui/material";
import React from "react";

export default function Checkbox(props) {
  const { name, label, value, disabled, onChange, onClick, style } = props;
  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });
  return (
    <FormControl className="width-100" style={style}>
      <FormControlLabel
        style={style}
        control={
          <MuiCheckbox
            disabled={disabled}
            name={name}
            className="color--purple"
            checked={value}
            onChange={(e) =>
              onClick !== undefined
                ? onClick(convertToDefEventPara(name, e.target.checked))
                : onChange(name, e.target.checked)
            }
          />
        }
        label={label}
      />
    </FormControl>
  );
}

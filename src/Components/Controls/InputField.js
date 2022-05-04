import { TextField } from "@mui/material";
import React from "react";

export default function InputField(props) {
  const { label, value, name, onChange, style } = props;

  return (
    <form noValidate autoComplete="off">
      <TextField
        style={style}
        label={label}
        variant="outlined"
        value={value}
        name={name}
        onChange={onChange}
      />
    </form>
  );
}

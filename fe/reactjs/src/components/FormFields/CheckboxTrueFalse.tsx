import { Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel } from "@mui/material";
import React from "react";
import { Control, useController } from "react-hook-form";

export interface CheckboxFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
}

export function CheckboxTrueFalse({ name, control, label, disabled }: CheckboxFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({ name, control });

  return (
    <FormControl disabled={disabled} margin="normal" component="fieldset" error={invalid}>
      <FormControlLabel
        control={<Checkbox checked={value} onChange={onChange} onBlur={onBlur} />}
        label={label}
      />
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
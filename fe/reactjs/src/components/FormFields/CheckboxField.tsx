import { Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel } from "@mui/material";
import React from "react";
import { Control, useController } from "react-hook-form";

export interface CheckboxOption {
  label?: string;
  value: number | string;
}

export interface CheckboxGroupFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: CheckboxOption[];
}

export function CheckboxGroupField({ name, control, label, disabled, options }: CheckboxGroupFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({ name, control });

  return (
    <FormControl disabled={disabled} margin="normal" component="fieldset" error={invalid}>
      <FormLabel id="demo-checkbox-group-label">{label}</FormLabel>
      {options.map(option => (
        <FormControlLabel
          key={option.value}
          control={<Checkbox value={option.value} onChange={onChange} onBlur={onBlur} />}
          label={option.label}
        />
      ))}
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}




import { TextField } from '@mui/material';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface ITextareaFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    control: Control<any>;
    label?: string
}

export function CustomTextareaField({ name, control, label, ...inputProps }: ITextareaFieldProps) {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    });

    return (
        <TextField
            fullWidth
            multiline
            size="small"
            margin='dense'
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            label={label}
            variant="outlined"
            inputRef={ref}
            error={invalid}
            helperText={error?.message}
            inputProps={inputProps}
            rows={5}
        />
    );
}

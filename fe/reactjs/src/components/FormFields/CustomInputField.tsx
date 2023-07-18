import { TextField } from '@mui/material';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';


export interface ICustomFieldProps {
    name: string;
    placeholder: string;
    control: Control<any>;
    label?: string;
}

export function CustomInputField({ name, control, placeholder, label, ...inputProps }: ICustomFieldProps) {
    
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error }
    } = useController({
        name, control
    })

    return (
        <TextField
            size='small'
            value= { value }
            onChange= { onChange }
            onBlur= { onBlur }
            // label= {label }
            inputRef= {ref}
            error = {invalid}
            helperText = { error?.message }
            inputProps= { inputProps }
            placeholder= {placeholder}
            color = {'secondary'}
            focused 
        />
    );
}

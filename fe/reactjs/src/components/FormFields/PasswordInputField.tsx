import { TextField } from '@mui/material';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface IPasswordInputFieldProps {
    name: string;
    placeholder: string;
    control: Control<any>;
    label?: string;
}

export function PasswordInputField({ name, control, placeholder, label, ...inputProps }: IPasswordInputFieldProps) {
    const [showPassword, setShowPassword] = React.useState(true);
    const handleClickShowPassword = () => setShowPassword((show) => !show);


    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error }
    } = useController({
        name, control
    })

    return (
        <>
            <div className="w-full relative">
                <TextField
                    size='small'
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    // label= {label }
                    inputRef={ref}
                    error={invalid}
                    helperText={error?.message}
                    inputProps={inputProps}
                    placeholder={placeholder}
                    color={'secondary'}
                    focused
                    type={showPassword ? 'password' : 'text' }
                    className='w-[100%]'
                />
                {
                    showPassword ? (<span className='absolute right-2 top-1 text-2xl cursor-pointer' onClick={handleClickShowPassword}><i className="ri-eye-fill"></i></span>
                    ) : (<span className='absolute right-2 top-1 text-2xl cursor-pointer' onClick={handleClickShowPassword}><i className="ri-eye-off-fill"></i></span>)
            }
            </div>

        </>

    );
}

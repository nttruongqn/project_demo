import * as React from "react";
import { LoginModel } from "../../../../models/auth.model";
import { useForm } from "react-hook-form";
import { Button, CircularProgress } from "@mui/material";
import { InputField } from "../../../../components/FormFields";

export interface LoginFormProps {
  initialValues: LoginModel;
  onSubmit?: (formValues: LoginModel) => void;
}

export default function LoginForm({ initialValues, onSubmit }: LoginFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginModel>({
    defaultValues: initialValues,
  });

  const handleFormSubmit = async ( formValues: LoginModel) => {
    try {
      await onSubmit?.(formValues);
    } catch (error) {
      console.log("Login failed");
    }
  };

  return (
      <div className="m-4">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <InputField name="email" control={control} label="Email" />
          <InputField name="password" control={control} label="Password" type="password"/>
          <div className="mt-3">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting && <CircularProgress size={16} />} &nbsp;Login
            </Button>
          </div>
        </form>
      </div>
  );
}

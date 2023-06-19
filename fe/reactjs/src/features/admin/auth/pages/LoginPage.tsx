import React from "react";
import { LoginModel } from "../../../../models/auth.model";
import { authActions, selectIsLoggedIn } from "../auth.slice";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  React.useEffect(() => {
    if(isLoggedIn){
      navigate('/admin')
    }
  }, [isLoggedIn, navigate, dispatch])
  

  const initialValues: LoginModel = {
    email: "",
    password: "",
    // ...login,
  } as LoginModel;

  const handleLogin = async (formValues: LoginModel) => {
    dispatch(authActions.login(formValues));
  };

  return (
    <>
      <div className="login-page min-h-screen w-full flex">
        <div className="lg:w-1/4 lg:h-1/6 bg-red border border-1 m-auto items-center p-4 shadow-md">
          <h4 className="text-center font-bold text-2xl">Admin Login</h4>
              <LoginForm initialValues={initialValues} onSubmit={handleLogin} />
        </div>
      </div>
    </>
  );
}

export default LoginPage;

import { GoogleLogin } from "@react-oauth/google"

import './Login.scss';
import { useAuth } from "../stores/auth";

export const Login = () => {
  const { google } = useAuth();

  const responseMessage = async () => {
    // console.log(credential);

    // await fetch('http://localhost:3000/auth/google/callback', { headers: { Authorization: credential },  });
    return google();
  };
  const errorMessage = (error) => {
      console.log(error);
  };

  return (
    <div className="login">
      <img src="/public/logo.jpeg" alt="" />
      <h1>AR2GO</h1>
      <a onClick={responseMessage}>Login</a>
      {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} theme="filled_blue" /> */}
    </div>
  )
}
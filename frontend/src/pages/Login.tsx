import './Login.scss';
import { useAuth } from "../stores/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { google, isAuth } = useAuth();
  const navigate = useNavigate();

  const responseMessage = async () => {
    return google();
  };

  if (isAuth) {
    navigate('/map');
  }

  return (
    <div className="login">
      <img src="/logo.jpeg" alt="" />
      <h1>AR2GO</h1>
      <a onClick={responseMessage}>Login</a>
    </div>
  );
}
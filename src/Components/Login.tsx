import React, { ChangeEvent } from "react";
import { FcGoogle } from "react-icons/fc";
import { GoMarkGithub } from "react-icons/go";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, provider } from "../firebaseConfig";
import { BsFacebook } from "react-icons/bs";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
  FacebookAuthProvider
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

interface props {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login({ setIsAuth }: props) {
  const [dataLogin, setDataLogin] = React.useState({
    Email: "",
    Password: ""
  });

  let navigate = useNavigate();

  const handleLoginInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setDataLogin({ ...dataLogin, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, dataLogin.Email, dataLogin.Password)
      .then((res) => {
        setDataLogin({
          Email: "",
          Password: ""
        });
        //const user = res.user
        //updateProfile(user, {
        //displayName: dataSignUp.Name
        //  })
        // const getData  = getDocs(database);
        //setUserName(getData.docs.map((item) => {
        //return {...item.getData(), id: item.id}
        //}))

        toast.success(
          "Login successfully, You will now automatically got to the Shop"
        );
        // localStorage.setItem("isAuth", true);
        setTimeout(() => {
          navigate("/");
          setIsAuth(true);
        }, 3000);
      })
      .catch((error) => toast.error(error.message));
  };

  const googleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        //const name= result.user.displayName
        //localStorage.setItem("name" , name)
        toast.success(
          "Login successfully, You will now automatically got to the Shop"
        );
        setTimeout(() => {
          navigate("/");
          setIsAuth(true);
        }, 3000);
      })
      .catch((error) => toast.error(error.message));
  };

  const githubLogin = () => {
    signInWithPopup(auth, new GithubAuthProvider())
      .then(() => {
        toast.success(
          "Login successfully, You will now automatically got to the Shop"
        );

        setTimeout(() => {
          navigate("/");
          setIsAuth(true);
        }, 3000);
      })
      .catch((error) => toast.error(error.message));
  };

  const facebookLogin = () => {
    signInWithPopup(auth, new FacebookAuthProvider())
      .then(() => {
        toast.success(
          "Login successfully, You will now automatically got to the Shop"
        );
        setTimeout(() => {
          navigate("/");
          setIsAuth(true);
        }, 3000);
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="login">
      <ToastContainer />
      <div className="loginContainer">
        <h1 className="welcomeBack">welcome back!</h1>
        <div className="loginData">
          <input
            className="loginEmail"
            type="text"
            placeholder="Email...."
            onChange={handleLoginInput}
            name="Email"
            value={dataLogin.Email}
          />
        </div>
        <input
          className="loginPassword"
          type="password"
          placeholder="Password"
          onChange={handleLoginInput}
          name="Password"
          value={dataLogin.Password}
        />
        <div className="LOGINDiv">
          <button className="LOGIN" onClick={handleLogin}>
            Login
          </button>
        </div>
        <div className="forget">
          <Link to="/ResetPassword" className="ResetPassword">
            Forget your password?
          </Link>
        </div>
        <h1 className="or">______Or_______</h1>

        <div className="with">
          <div className="githubDiv">
            <FcGoogle className="google" />
            <button className="googleLogin" onClick={googleSignIn}>
              Login With Google
            </button>
          </div>
          <div className="githubDiv">
            <BsFacebook className="facebook" />
            <button className="facebook-btn" onClick={facebookLogin}>
              Login With Facebook
            </button>
          </div>
          <div className="githubDiv">
            <GoMarkGithub className="github" />
            <button className="githubLogin" onClick={githubLogin}>
              Login With GitHub
            </button>
          </div>
        </div>
        <h1 className="register">
          Don't have an account?
          <Link to="/SignUp">
            <button className="goRegister">Sign Up</button>
          </Link>
        </h1>
      </div>
    </div>
  );
}

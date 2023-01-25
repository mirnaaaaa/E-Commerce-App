import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db, auth } from "../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function SignUp({setIsAuth}) {
  const database = collection(db, "users");
  let navigate = useNavigate();

  const [dataSignUp, setDataSignUp] = useState({
    Name: "",
    Email: "",
    Password: ""
  });
  const handleInput = (e) => {
    let input = { [e.target.name]: e.target.value };
    setDataSignUp({ ...dataSignUp, ...input });
  };
  const handleSubmit = () => {
    createUserWithEmailAndPassword(auth, dataSignUp.Email, dataSignUp.Password)
      .then((res) => {
        // const user= res.user
        addDoc(database, dataSignUp)
          .then(() => {
            setDataSignUp({
              Name: "",
              Email: "",
              Password: ""
            });
            const user = res.user;
            updateProfile(user, {
              displayName: dataSignUp.Name
            });
            //  console.log(user)

            toast.success(
              "Sign Up successfully, You will now automatically got to the Shop"
            );
            // localStorage.setItem("isAuth", true);
            setTimeout(() => {
              navigate("/");
              setIsAuth(true)
            }, 3000);
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="login">
      <ToastContainer />
      <div className="loginContainer">
        <div className="signUpContainer">
          <div className="name">
            <input
              className="fullName"
              type="text"
              placeholder="FullName"
              onChange={(e) => handleInput(e)}
              name="Name"
              value={dataSignUp.Name}
            />
          </div>
          <div className="emailHandle">
            <input
              className="fullName"
              type="text"
              placeholder="Email"
              name="Email"
              onChange={(e) => handleInput(e)}
              value={dataSignUp.Email}
            />
          </div>
          <input
            className="fullName"
            type="password"
            placeholder="Password"
            onChange={(e) => handleInput(e)}
            value={dataSignUp.Password}
            name="Password"
          />
          <div className="moveSignUp">
            <button className="SIGNUP" onClick={handleSubmit}>
              Sign Up
            </button>
          </div>
        </div>
        <h1 className="register">
          Already have an account..
          <Link to="/Login">
            <button className="goRegister">LOGIN</button>
          </Link>
        </h1>
      </div>
    </div>
  );
}

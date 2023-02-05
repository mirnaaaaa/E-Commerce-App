import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState<string>("");

  let navigate = useNavigate();

  const reset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setTimeout(() => {
          navigate("/Login");
        }, 3000);
        toast.success("Please check your email for reset link.");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="resetPage">
      <ToastContainer />
      <div className="resetContainer">
        <div className="reset">
          <h1 className="ifYou">FORGOTTEN PASSWORD</h1>
          <p className="interEmail">
            If you've forgotten your password, please enter your registered
            email address. We'll send you a link to reset your password.
          </p>
        </div>
        <div className="loginData">
          <input
            className="loginEmail"
            type="text"
            name="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </div>
        <div className="choose">
          <div className="pad-right">
            <Link className="cancelLink" to="/Login">
              <button className="cancel">CANCEL</button>
            </Link>
          </div>

          <button className="reset-btn" onClick={reset}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

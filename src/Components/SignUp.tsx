import React, { ChangeEvent, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db, auth } from "../firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Typography, Stack, TextField, Button } from "@mui/material";
interface props {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignUp({ setIsAuth }: props) {
  const database = collection(db, "users");
  const [dataSignUp, setDataSignUp] = useState({
    Name: "",
    Email: "",
    Password: ""
  });

  let navigate = useNavigate();

  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setDataSignUp({ ...dataSignUp, [e.target.name]: e.target.value });
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
              setIsAuth(true);
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
    <div className="check-container">
      <ToastContainer />
      <Box
        sx={{
          color: "black",
          width: "555px"
        }}
      >
        <Stack spacing={1}>
          <TextField
            onChange={handleInput}
            name="Name"
            variant="filled"
            required
            value={dataSignUp.Name}
            label="FullName"
            color="success"
          />
          <TextField
            onChange={handleInput}
            value={dataSignUp.Email}
            name="Email"
            variant="filled"
            required
            label="Email"
            color="success"
          />
          <TextField
            onChange={handleInput}
            value={dataSignUp.Password}
            variant="filled"
            label="Password"
            required
            type="password"
            color="success"
            name="Password"
          />
        </Stack>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            bgcolor: "#004d40",
            height: "50px",
            marginTop: "17px"
          }}
        >
          <Button onClick={handleSubmit} sx={{ color: "white" }}>
            SignUp
          </Button>
        </Box>
        <Typography m={1} variant="caption">
          <b> Already have an account.</b>
        </Typography>
        <Link className="linkBlack" to="/Login">
          <Typography variant="caption">Sign In</Typography>
        </Link>
      </Box>
    </div>
  );
}

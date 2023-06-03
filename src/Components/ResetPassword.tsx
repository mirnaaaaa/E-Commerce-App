import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { Box, Stack, TextField, Button, Typography } from "@mui/material";

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
    <div className="check-container">
      <ToastContainer />
      <Box
        sx={{
          color: "black",
          width: "555px"
        }}
      >
        <Typography sx={{ display: "flex", justifyContent: "center" }}>
          FORGOTTEN PASSWORD
        </Typography>
        <Typography m={1} variant="body2">
          If you've forgotten your password, please enter your registered email
          address. We'll send you a link to reset your password.{" "}
        </Typography>
        <Stack spacing={1}>
          <TextField
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            variant="filled"
            label="email"
            required
            color="success"
            name="email"
          />
        </Stack>
        <Box
          m={3}
          sx={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <Link className="linkBlack" to="/Login">
            <Button
              variant="outlined"
              color="success"
              sx={{
                "&:hover": {
                  fontSize: "15px"
                }
              }}
            >
              CANCEL
            </Button>
          </Link>
          <Button
            variant="outlined"
            color="success"
            onClick={reset}
            sx={{
              "&:hover": {
                fontSize: "15px"
              }
            }}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </div>
  );
}

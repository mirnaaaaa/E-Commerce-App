import React, { ChangeEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, provider } from "../firebaseConfig";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
  FacebookAuthProvider
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Divider,
  Stack,
  TextField,
  Button,
  Link
} from "@mui/material";

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
          "Login successfully, You will now automatically go to the Shop"
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
    <div className="check-container">
      <ToastContainer />
      <Box
        sx={{
          color: "black"
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">
            <b>welcome back!</b>
          </Typography>
        </Box>
        <Divider sx={{ m: "5px" }} />
        <Stack spacing={1}>
          <TextField
            onChange={handleLoginInput}
            value={dataLogin.Email}
            name="Email"
            variant="filled"
            required
            label="Email"
            color="success"
          />
          <TextField
            onChange={handleLoginInput}
            value={dataLogin.Password}
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
          <Button onClick={handleLogin} sx={{ color: "white" }}>
            Sign in
          </Button>
        </Box>
        <Link
          color="inherit"
          variant="caption"
          href="/ResetPassword"
          underline="hover"
        >
          Forget your password?
        </Link>
        <Divider>
          <Typography variant="body2">or</Typography>
        </Divider>
        <Stack spacing={2} direction="row" >
          <Button
                      variant="outlined"
                      sx={{color:"black"}}
            onClick={googleSignIn}
            startIcon={<GoogleIcon sx={{color:"orange"}}/>}
          >
            Login With Google
          </Button>
          <Button
            onClick={facebookLogin}
            variant="outlined"
            sx={{color:"black"}}
            startIcon={<FacebookIcon sx={{color:"blue"}}/>}
          >
            Login With Facebook
          </Button>
          <Button        sx={{color:"black"}}     variant="outlined"
 onClick={githubLogin} startIcon={<GitHubIcon  />}>
            Login With GitHub
          </Button>
        </Stack>
        <Typography m={1} variant="caption">
          <b> Don't have an account?</b>
        </Typography>
        <Link
          href="/SignUp"
          color="inherit"
          variant="caption"
          underline="hover"
          sx={{ color: "#004d40" }}
        >
          Sign Up
        </Link>
      </Box>
    </div>
  );
}

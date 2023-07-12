import React, { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import {
  AppBar,
  Button,
  Stack,
  Toolbar,
  Typography,
  Avatar,
  Badge
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useSelector, useDispatch } from "react-redux";
import { getId } from "../features/Shop";
import { Logout } from "../features/Cart";
import { clearFav } from "../features/Favorite";
interface props {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ isAuth, setIsAuth }: props) {
  const [name, setName] = useState<string>("");
  const [user] = useAuthState(auth);

  const Total = useSelector((state: any) => state.cart.totalQuantity);
  const favoriteList = useSelector((state: any) => state.favorite.favorite);

  let navigate = useNavigate();
  const dispatch: any = useDispatch();

  useEffect(() => {
    const Auth = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          getId({
            id: user.uid
          })
        );
      } else {
        dispatch(Logout());
        dispatch(clearFav());
      }
    });
    return () => {
      Auth();
    };
  }, [dispatch]);

  const handleLogout = async () => {
    await signOut(auth).then(() => {
      navigate("/Login");
      localStorage.clear();
      setIsAuth(false);
      // setCart([]);
      // setFavoriteList([]);
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName === null && user.email !== null) {
          const email = user.email.substring(0, user.email.indexOf("@"));
          const makeTheName = email.charAt(0).toUpperCase() + email.slice(1);
          setName(makeTheName);
        }
        setName("there");
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, [setIsAuth]);

  return (
    <div>
      <AppBar sx={{ background: "#004d40" }}>
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between", m: "2px" }}
        >
          <Stack direction="row" spacing={1}>
            <Avatar
              sx={{
                background: "#80cbc4",
                color: "#004d40"
              }}
            >
              M
            </Avatar>
            <Typography variant="h4">
              Mirna's <b style={{ color: "#80cbc4" }}>Shop</b>
            </Typography>
          </Stack>
          <Stack direction="row" spacing={3}>
            <Link to="/" className="link">
              <Typography>Home</Typography>
            </Link>
            <Link to="/MyOrder" className="link">
              <Typography>myOrders</Typography>
            </Link>
          </Stack>
          <Stack spacing={3} direction="row">
            <Link to="/Fav" className="link">
              <Badge color="error" badgeContent={favoriteList.length}>
                <FavoriteBorderIcon />
              </Badge>
            </Link>
            <Link to="/Cart" className="link">
              <Badge color="error" badgeContent={Total}>
                <ShoppingCartCheckoutIcon />
              </Badge>
            </Link>
          </Stack>
          <Stack direction="row" spacing={1}>
            {!isAuth ? (
              <>
                <Link className="link" to="/Login">
                  LOGIN
                </Link>
              </>
            ) : (
              <>
                <Typography sx={{ paddingTop: "7px" }}>
                  Hi,
                  {user?.displayName ? user.displayName : name}
                </Typography>
                <Avatar
                  alt="YourProfile"
                  src={user?.photoURL || "www.default.imageurl"}
                />
                <Button sx={{ color: "white" }} onClick={handleLogout}>
                  Log Out
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  );
}

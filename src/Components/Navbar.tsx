import React, { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { FavoriteContext } from "../Context/FavoriteContext";
import { FavoriteType } from "../Context/FavoriteContext";
import { CartType } from "../Context/CartContext";
import {
  AppBar,
  Link,
  Button,
  Stack,
  Toolbar,
  Typography,
  Avatar,
  Badge
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import styled from "@emotion/styled";
interface props {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ isAuth, setIsAuth }: props) {
  const [name, setName] = useState<string>("");
  const { favoriteList, setFavoriteList } = useContext(
    FavoriteContext
  ) as FavoriteType;
  const { setCart, sum } = useContext(CartContext) as CartType;
  const [user] = useAuthState(auth);

  let navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth).then(() => {
      navigate("/Login");
      localStorage.clear();
      setIsAuth(false);
      setCart([]);
      setFavoriteList([]);
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

  const LINK = styled(Link)({
    color:"inherit",
    underline:"hover"
  });

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
            <LINK href="/">
              <Typography>Home</Typography>
            </LINK>
            <LINK href="/MyOrder">
              <Typography>myOrders</Typography>
            </LINK>
          </Stack>
          <Stack spacing={3} direction="row">
            <LINK href="/Fav">
              <Badge color="error" badgeContent={favoriteList.length}>
                <FavoriteBorderIcon />
              </Badge>
            </LINK>
            <LINK href="/Cart">
              <Badge color="error" badgeContent={sum}>
                <ShoppingCartCheckoutIcon />
              </Badge>
            </LINK>
          </Stack>
          <Stack direction="row" spacing={1}>
            {!isAuth ? (
              <>
                <LINK           
 href="/Login" >
                  LOGIN
                </LINK>
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
                <Button sx={{color:"white"}} onClick={handleLogout}>
Log Out                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  );
}

import React from "react";
import { useContext } from "react";
import { FavoriteContext } from "../Context/FavoriteContext";
import { CartContext } from "../Context/CartContext";
import { CartType } from "../Context/CartContext";
import { FavoriteType } from "../Context/FavoriteContext";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";

export default function Fav() {
  const { removeFromFav, favoriteList, setFavoriteList } = useContext(
    FavoriteContext
  ) as FavoriteType;
  const { addToCart } = useContext(CartContext) as CartType;

  const removeAll = () => {
    setFavoriteList([]);
  };

  return (
    <Box>
      {favoriteList.length === 0 && (
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              paddingTop: "100px",
              color: "#004d40",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Typography variant="h5" m={4}>
              You haven’t saved an item yet!
            </Typography>
            <Typography variant="body2" sx={{ width: "27%" }}>
              Found something you like? Tap on the heart shaped icon to add it
              to your wishlist! All your saved items will appear here.
            </Typography>
            <Box m={4} >
            <Link to="/" className="link">
            <Button variant="contained" sx={{bgcolor:"#004d40","&:hover": {
                bgcolor: "#80cbc4",
                fontSize: "15px",
                color: "#004d40"
              } }}>
              START SHOPPING
            </Button>
            </Link>
          </Box>
          </Box>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          paddingTop: "75px"
        }}
      >
        {favoriteList.map((item) => (
          <Box sx={{ m: 4, maxWidth: "250px" }} key={item.id}>
            <Card sx={{ borderRadius: "30px", height: "100%" }}>
              <CardActionArea sx={{ height: "100%" }}>
                <Box
                  m={1}
                  sx={{
                    position: "absolute ",
                    right: "0px",
                    bgcolor: "#e0f2f1",
                    borderRadius: "50%"
                  }}
                >
                  <IconButton
                    aria-label="add to favorites"
                    onClick={() => removeFromFav(item)}
                  >
                    <FavoriteIcon color="error" />
                  </IconButton>
                </Box>
                <Box
                  m={0.8}
                  color="white"
                  sx={{
                    position: "absolute ",
                    left: "0px",
                    p: "4px",
                    bgcolor: "#004d40",
                    borderRadius: "10%",
                    
                  }}
                >
                  <Typography>-{item.discountPercentage}%</Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    position: "absolute ",
                    alignItems: "center",
                    display: "flex",
                    top: "25%",
                    justifyContent: "center"
                  }}
                >
                  <Button
                    sx={{
                      fontSize: "0.2px",
                      width: "80%",
                      height: "50px",
                      color: "white",
                      "&:hover": {
                        bgcolor: "#80cbc4",
                        fontSize: "20px",
                        color: "#004d40"
                      }
                    }}
                    onClick={() => addToCart(item)}
                  >
                    Add To Cart
                  </Button>
                </Box>
                <CardMedia
                  sx={{ height: "250px" }}
                  component={"img"}
                  alt={item.title}
                  src={item.images[0]}
                />
                <CardContent sx={{ height: "100%" }}>
                  <Typography
                    sx={{ display: "flex", justifyContent: "center" }}
                    variant="h5"
                  >
                    {item.title}
                  </Typography>
                  <Typography m={1} variant="body2">
                    {item.description}
                  </Typography>
                  <Box
                    m={1}
                    sx={{ position: "absolute", bottom: "0", right: "50%" }}
                  >
                    <Typography variant="caption">${item.price}</Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        ))}
      </Box>
      {favoriteList.length !== 0 && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            color="success"
            variant="outlined"
            onClick={removeAll}
            sx={{ m: "25px", width: "15%" }}
          >
            Remove All
          </Button>
        </Box>
      )}
    </Box>
  );
}

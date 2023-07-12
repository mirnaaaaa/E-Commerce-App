import React from "react";
import { ProductType } from "../Types/ProductsType";
import {
  Box,
  Card,
  CardActionArea,
  IconButton,
  Button,
  CardMedia,
  CardContent,
  Typography
} from "@mui/material";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addToCart } from "../features/Cart";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFav, addToFav } from "../features/Favorite";
interface PostsProps {
  item: ProductType;
}

export default function SelectCategory({ item }: PostsProps) {
  const favoriteList = useSelector((state: any) => state.favorite.favorite);
  const dispatch: any = useDispatch();

  return (
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
          <IconButton aria-label="add to favorites">
            {favoriteList.find((x:any) => x.id === item.id) ? (
              <FavoriteIcon color="error" onClick={() => dispatch(removeFromFav(item.id))} />
            ) : (
              <FavoriteBorderTwoToneIcon
                color="error"
                onClick={() => dispatch(addToFav(item))}
              />
            )}
          </IconButton>
        </Box>
        <Box
          m={0.8}
          sx={{
            position: "absolute ",
            left: "0px",
            p: "4px",
            bgcolor: "#004d40",
            borderRadius: "10%",
            color: "white"
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
            onClick={() => dispatch(addToCart(item))}
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
          <Box m={1} sx={{ position: "absolute", bottom: "0", right: "50%" }}>
            <Typography variant="body2">${item.price}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

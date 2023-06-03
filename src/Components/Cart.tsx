import React from "react";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { FavoriteContext } from "../Context/FavoriteContext";
import { CartType } from "../Context/CartContext";
import { FavoriteType } from "../Context/FavoriteContext";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {
  Card,
  CardActionArea,
  Box,
  IconButton,
  Button,
  CardMedia,
  CardContent,
  Typography,
  Tooltip,
  Paper,
  Stack,
  styled
} from "@mui/material";
import { Link } from "react-router-dom";

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between"
});

export default function Cart() {
  const { cart, setCart, addToCart, total, sum } = useContext(
    CartContext
  ) as CartType;
  const { addToFavorite, removeFromFav, favoriteList } = useContext(
    FavoriteContext
  ) as FavoriteType;

  const handleRemove = (id: number, q: number) => {
    if (q === 1) {
      const filter = cart.filter((x) => x.id !== id);
      setCart(filter);
    } else {
      const toAdd = cart.map((x) =>
        x.id === id ? { ...x, quantity: x.quantity - 1 } : x
      );
      setCart(toAdd);
    }
  };

  const deleteItem = (item: number) => {
    const filter = cart.filter((x) => x.id !== item);
    setCart(filter);
  };

  return (
    <Box my={18}>
      {cart.length === 0 && (
        <Box
          sx={{
            color: "#004d40",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Typography variant="h5"> Your shopping cart looks empty</Typography>
          <Typography m={1} variant="caption">
            What are you waiting for?
          </Typography>
          <Box m={2}>
            <Link to="/" className="link">
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#004d40",
                  "&:hover": {
                    bgcolor: "#80cbc4",
                    fontSize: "15px",
                    color: "#004d40"
                  }
                }}
              >
                START SHOPPING
              </Button>
            </Link>
          </Box>
        </Box>
      )}
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 9">
          {cart.map((item) => (
            <Box m={1.5}>
              <Card>
                <Box
                  key={item.id}
                  sx={{ display: "flex", flexDirection: "row", width: "100%" }}
                >
                  <CardActionArea sx={{ display: "flex", width: "100%" }}>
                    <CardMedia
                      sx={{
                        height: "200px",
                        width: "160px",
                        display: "flex",
                        marginLeft: "10px"
                      }}
                      component={"img"}
                      alt={item.title}
                      src={item.images[1]}
                    />
                    <CardContent sx={{ display: "flex", width: "100%" }}>
                      <Box
                        sx={{
                          position: "absolute ",
                          left: "0px",
                          p: "4px",
                          top: "0",
                          marginTop: "2px",
                          marginLeft: "10px",
                          bgcolor: "#004d40",
                          borderRadius: "10%",
                          color: "white"
                        }}
                      >
                        <Typography>-{item.discountPercentage}%</Typography>
                      </Box>
                      <Box sx={{ width: "100%", marginLeft: "30px" }}>
                        <Typography variant="h5">{item.title}</Typography>
                        <Typography
                          m={0.2}
                          sx={{ fontSize: "11px", color: "#FA6338" }}
                        >
                          {item.stock} left in the Store
                        </Typography>
                        <Typography m={1} variant="body2">
                          {item.description}
                        </Typography>
                        <Box
                          m={3}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%"
                          }}
                        >
                          <Stack
                            sx={{ position: "absolute ", right: "11px" }}
                            spacing={20}
                            direction="row"
                          >
                            <Box>
                              <Typography color="#FA6338" variant="body2">
                                $
                                {(
                                  (item.price * item.discountPercentage) /
                                  100
                                ).toFixed(2)}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="grey"
                                sx={{
                                  textDecoration: "line-through"
                                }}
                              >
                                ${item.price}
                              </Typography>
                            </Box>
                            <Box display="flex">
                              {item.quantity === 1 ? (
                                <Button
                                  disabled
                                  variant="contained"
                                  sx={{ borderRadius: "12px", height: "25px" }}
                                >
                                  <RemoveIcon />
                                </Button>
                              ) : (
                                <Button
                                  color="error"
                                  variant="outlined"
                                  sx={{ borderRadius: "12px", height: "25px" }}
                                  onClick={() =>
                                    handleRemove(item.id, item.quantity)
                                  }
                                >
                                  <RemoveIcon />
                                </Button>
                              )}

                              <Paper
                                sx={{ borderRadius: "12px", height: "25px" }}
                              >
                                <Typography
                                  sx={{
                                    marginLeft: "25px",
                                    paddingRight: "25px"
                                  }}
                                >
                                  {item.quantity}
                                </Typography>
                              </Paper>
                              <Button
                                color="success"
                                variant="outlined"
                                sx={{ borderRadius: "12px", height: "25px" }}
                                onClick={() => addToCart(item)}
                              >
                                <AddIcon />
                              </Button>
                            </Box>
                            <Typography>
                              $
                              {(
                                (item.price *
                                  item.quantity *
                                  item.discountPercentage) /
                                100
                              ).toFixed(2)}
                            </Typography>
                          </Stack>
                        </Box>
                        <IconButton aria-label="add to favorites">
                          {favoriteList.find((x) => x.id === item.id) ? (
                            <FavoriteIcon
                              sx={{ fontSize: "20px" }}
                              color="error"
                              onClick={() => removeFromFav(item)}
                            />
                          ) : (
                            <>
                              <FavoriteBorderTwoToneIcon
                                sx={{ fontSize: "20px" }}
                                color="error"
                                onClick={() => addToFavorite(item)}
                              />
                              <Typography sx={{ fontSize: "10px", m: "4px" }}>
                                Save to later
                              </Typography>
                            </>
                          )}
                        </IconButton>
                        <Tooltip title="Remove" placement="right">
                          <IconButton>
                            <DeleteForeverIcon
                              sx={{ m: "5px", fontSize: "20px" }}
                              onClick={() => deleteItem(item.id)}
                            />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
        {cart.length !== 0 && (
          <Box m={1.5} gridColumn="span 3">
            <Paper>
              <Box m={2}>
                <Typography variant="h6">Order Sumarry</Typography>
                <StyledBox>
                  <Typography variant="caption">Items:</Typography>
                  <Typography>
                    <b>{sum}</b>
                  </Typography>
                </StyledBox>
                <StyledBox>
                  <Typography variant="caption">Shipping:</Typography>
                  <Typography>
                    <b>$50</b>
                  </Typography>
                </StyledBox>
                <StyledBox>
                  <Typography variant="caption">Subtotal:</Typography>
                  <Typography>
                    <b>${total}</b>
                  </Typography>
                </StyledBox>
                <Link to="/CheckOut" className="link">
                  <Box
                    m={1}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      bgcolor: "#004d40",
                      height: "50px"
                    }}
                  >
                    <Button sx={{ color: "white" }}>Checkout NOW</Button>
                  </Box>
                </Link>
              </Box>
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
}

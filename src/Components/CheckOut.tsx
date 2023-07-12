import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductType } from "../Types/ProductsType";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { useSelector } from "react-redux";

export default function CheckOut() {
  const [shippingDetails, setShippingDetails] = useState({
    FirstName: "",
    LastName: "",
    Mobile: "",
    City: "",
    State: "",
    Address: ""
  });

  const id = useSelector((state: any) => state.shop.value.id);
  const cart = useSelector((state: any) => state.cart.cart);
  const TotalQuantity = useSelector((state: any) => state.cart.totalQuantity);
  const TotalAmount = useSelector((state: any) => state.cart.totalAmount);

  let navigate = useNavigate();

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  const placeOrder = async (item: ProductType[]) => {
    if (
      shippingDetails.City === "" ||
      shippingDetails.FirstName === "" ||
      shippingDetails.LastName === "" ||
      shippingDetails.Mobile === "" ||
      shippingDetails.State === "" ||
      shippingDetails.Address === ""
    ) {
      toast.error("Please fill all the required fields");
    } else {
      const items = collection(db, `AllOrders/${id}/Orders`);
      await addDoc(items, {
        item,
        shippingDetails,
        time: Timestamp.fromDate(new Date()),
        totalItems: TotalQuantity,
        cash: TotalAmount.toFixed(2)
      }).then(() => {
        setShippingDetails({
          FirstName: "",
          LastName: "",
          Mobile: "",
          City: "",
          State: "",
          Address: ""
        });
        toast.success("Your order successfully added");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      });
    }
  };

  return (
    <div className="check-container">
      <Box
        sx={{
          color: "black",
          flexDirection: "column"
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">
            <b>Shipping Details</b>
          </Typography>
          <Typography variant="caption">
            ({TotalQuantity}) {TotalQuantity === 1 ? "Item" : "Items"}, $
            {TotalAmount.toFixed(2)}
          </Typography>
        </Box>

        <Divider />
        <Stack sx={{ m: "17px 0" }} spacing={4}>
          <Stack direction="row" spacing={3}>
            <TextField
              sx={{ width: "265px" }}
              required
              label="First Name"
              name="FirstName"
              color="success"
              onChange={handleInput}
              value={shippingDetails.FirstName}
            />
            <TextField
              value={shippingDetails.LastName}
              onChange={handleInput}
              sx={{ width: "265px" }}
              required
              label="Last Name"
              color="success"
              name="LastName"
            />
          </Stack>
        </Stack>
        <Stack>
          <TextField
            value={shippingDetails.Mobile}
            onChange={handleInput}
            label="Phone Number"
            required
            type="number"
            color="success"
            name="Mobile"
          />
        </Stack>
        <Stack sx={{ m: "17px 0" }}>
          <TextField
            label="Address"
            value={shippingDetails.Address}
            onChange={handleInput}
            name="Address"
          />
        </Stack>
        <Stack direction="row" spacing={3}>
          <TextField
            sx={{ width: "265px" }}
            required
            label="State"
            value={shippingDetails.State}
            onChange={handleInput}
            color="success"
            name="State"
          />
          <TextField
            value={shippingDetails.City}
            onChange={handleInput}
            sx={{ width: "265px" }}
            required
            label="City"
            name="City"
            color="success"
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
          <Button onClick={() => placeOrder(cart)} sx={{ color: "white" }}>
            Place Order
          </Button>
        </Box>
      </Box>
    </div>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  query,
  onSnapshot,
  collection,
  getCountFromServer
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useContext } from "react";
import { IdContext } from "../Context/IdContext";
import { OrdersContext } from "../Context/OrdersContext";
import { UserContextType } from "../Context/IdContext";
import { OrdersType } from "../Context/OrdersContext";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Divider,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function MyOrders() {
  const { userId } = useContext(IdContext) as UserContextType;
  const { orders, setOrders } = useContext(OrdersContext) as OrdersType;
  const [count, setCount] = useState<number>(0);

  const getOrders = () => {
    const q = query(collection(db, `AllOrders/${userId}/Orders`));
    onSnapshot(q, (snap) => {
      let array: any = [];
      snap.forEach((doc) => {
        array.push({ ...doc.data(), Id: doc.id });
      });
      setOrders(array);
    });
  };

  const getCount = async () => {
    const collectionRef = collection(db, `AllOrders/${userId}/Orders`);
    const getTheNumbers = await getCountFromServer(collectionRef);
    setCount(getTheNumbers.data().count);
  };

  useEffect(() => {
    getOrders();
    getCount();
  }, [userId, count]);

  return (
    <Box sx={{ marginTop: "85px" }}>
      <Box m={1}>
        <Typography>
          <b>Orders {count}</b>
        </Typography>
        <Typography variant="caption">View your order history... </Typography>
      </Box>
      {orders.map((x) => (
        <Box m={1} key={x.Id}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingRight: "15px"
                }}
                variant="caption"
              >
                Placed on {x.time.toDate().toDateString()}
              </Typography>
              {x.item.map((item) => (
                <Box m={2} sx={{ display: "flex" }}>
                  <Avatar alt={item.title} src={item.images[0]} />
                  <Box>
                    <Typography m={1} variant="body1">
                      {item.title}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </AccordionSummary>
            <AccordionDetails>
              <Divider />
              {x.item.map((a) => (
                <Box sx={{ display: "flex" }}>
                  <Typography m={1} variant="body2">
                    <b>{a.title}:</b>
                  </Typography>
                  <Typography m={1} variant="body2">
                    {a.description}
                  </Typography>
                  {a.quantity !== 1 && (
                    <Typography sx={{ mt: "8px" }} variant="caption">
                      ({a.quantity} of this item)
                    </Typography>
                  )}
                </Box>
              ))}
              <Box m={1}>
                <Typography>
                  <b>Delivery address</b>
                </Typography>
                <Typography>
                  {x.shippingDetails.FirstName} {x.shippingDetails.LastName}
                </Typography>
                <Typography>
                  {x.shippingDetails.Address}, {x.shippingDetails.State},{" "}
                  {x.shippingDetails.City}
                </Typography>
                <Typography>{x.shippingDetails.Mobile}</Typography>
                <Typography>
                  <b>$</b>
                  {x.cash}
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      ))}
    </Box>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
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
    <div className="orders">
      <div className="center-allOrders">
        <h1 className="allOrders">All orders {count}</h1>
      </div>
      {orders.map((x) => (
        <div key={x.Id}>
          <Link to={`/OrderDetails/${x.Id}`} className="orderDecoration">
            <div className="orders-container">
              <div className="nameAndAddress">
                <h1 className="FirstName">
                  Name: {x.shippingDetails.FirstName}
                  {x.shippingDetails.LastName}
                </h1>
              </div>
              <h1 className="space">Items: ({x.totalItems})</h1>
              <h1 className="space">Cash: ${x.cash}</h1>
              <h1 className="date">{x.time.toDate().toDateString()}</h1>
              <br />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
//x.map((z) => z.title

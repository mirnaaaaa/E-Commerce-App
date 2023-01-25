import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { IdContext } from "../Context/IdContext";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { OrdersContext } from "./../Context/OrdersContext";
export default function OrderDetails() {
  const [orderItems, setOrderItems] = useState();
  const { userId } = useContext(IdContext);
  const { orders } = useContext(OrdersContext);
  const { Id } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    const correct = orders.find((x) => x.Id === Id);
    if (correct) {
      setOrderItems(correct);
    }
  }, [Id, orders]);
  const cancelOrder = (Id) => {
    const docRef = doc(db, `AllOrders/${userId}/Orders/${Id}`);
    deleteDoc(docRef);
    navigate("/MyOrder");
  };
  return (
    <div className="order-details">
      <div className="showOrders">
        {orderItems && (
          <>
            {orderItems.item.map((item) => (
              <div key={item.id} className="orders-container">
                <img
                  className="picture"
                  src={item.images[2]}
                  alt="productPicture"
                />
                <div className="favorite">
                  <h1 className="product-name">
                    Name:
                    {item.title}
                  </h1>
                </div>
                <div className="removeId">
                  <h2 className="havingItems">
                    ({item.quantity}) of this item
                  </h2>
                </div>
                <h3 className="dollar">
                  Price: $
                  {item.quantity > 1
                    ? (
                        (item.price * item.quantity * item.discountPercentage) /
                        100
                      ).toFixed(2)
                    : ((item.price * item.discountPercentage) / 100).toFixed(2)}
                </h3>
              </div>
            ))}
            <div className="detailsS">
              <h1 className="shownAMES">Order Details</h1>
              <div className="nexttO">
                <h1 className="nextTo-last">
                  FirstName: {orderItems.shippingDetails.FirstName}
                </h1>
                <h1 className="nextTo-first">
                  LastName: {orderItems.shippingDetails.LastName}
                </h1>
              </div>

              <h1>Mobile: {orderItems.shippingDetails.Mobile}</h1>
              <h1>Address: {orderItems.shippingDetails.Address}</h1>
              <h1>Total Order: ${orderItems.cash}</h1>
            </div>
            <div className="handle-btns">
              <div className="div-cancel">
                <button
                  className="cancelOrder"
                  onClick={() => cancelOrder(orderItems.Id)}
                >
                  Cancel order
                </button>
              </div>
              <div className="div-back">
                <Link className="orderDecoration" to="/MyOrder">
                  <button className="cancelOrder">Back</button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

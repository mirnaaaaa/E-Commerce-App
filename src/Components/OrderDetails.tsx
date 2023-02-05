import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { IdContext } from "../Context/IdContext";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { OrdersContext } from "../Context/OrdersContext";
import { UserContextType } from "../Context/IdContext";
import { order } from "../Context/OrdersContext";
import { OrdersType } from "../Context/OrdersContext";

export default function OrderDetails() {
  const [orderItems, setOrderItems] = useState<order[]>([]);
  const { userId } = useContext(IdContext) as UserContextType;
  const { orders } = useContext(OrdersContext) as OrdersType;

  const { Id } = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    const correct: any = orders.find((x) => x.Id === Id);
    if (correct) {
      setOrderItems([correct]);
    }
  }, [Id, orders]);

  const cancelOrder = (Id: string | number) => {
    const docRef = doc(db, `AllOrders/${userId}/Orders/${Id}`);
    deleteDoc(docRef);
    navigate("/MyOrder");
  };

  return (
    <div className="order-details">
      <div className="showOrders">
        {orderItems && (
          <>
            {orderItems.map((x) =>
              x.item.map((item) => (
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
                          (item.price *
                            item.quantity *
                            item.discountPercentage) /
                          100
                        ).toFixed(2)
                      : ((item.price * item.discountPercentage) / 100).toFixed(
                          2
                        )}
                  </h3>
                </div>
              ))
            )}
            {orderItems.map((x) => (
              <>
                <div className="detailsS">
                  <h1 className="shownAMES">Order Details</h1>
                  <div className="nexttO">
                    <h1 className="nextTo-last">
                      FirstName: {x.shippingDetails.FirstName}
                    </h1>
                    <h1 className="nextTo-first">
                      LastName: {x.shippingDetails.LastName}
                    </h1>
                  </div>

                  <h1>Mobile: {x.shippingDetails.Mobile}</h1>
                  <h1>Address: {x.shippingDetails.Address}</h1>
                  <h1>Total Order: ${x.cash}</h1>
                </div>
                <div className="handle-btns">
                  <div className="div-cancel">
                    <button
                      className="cancelOrder"
                      onClick={() => cancelOrder(x.Id)}
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
            ))}
          </>
        )}
      </div>
    </div>
  );
}

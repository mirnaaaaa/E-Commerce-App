import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { IdContext } from "./../Context/IdContext";
import { CartContext } from "../Context/CartContext";

export default function CheckOut(props) {
  const { userId } = useContext(IdContext);
  const { total, sum, cart } = useContext(CartContext);

  let navigate = useNavigate();
  const [shippingDetails, setShippingDetails] = React.useState({
    FirstName: "",
    LastName: "",
    Mobile: "",
    City: "",
    State: "",
    Address: ""
  });
  const handleInput = (e) => {
    let input = { [e.target.name]: e.target.value };
    setShippingDetails({ ...shippingDetails, ...input });
  };
  const placeOrder = async (item) => {
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
      const items = collection(db, `AllOrders/${userId}/Orders`);
      await addDoc(items, {
        item: item,
        shippingDetails,
        time: new Date(),
        totalItems: sum,
        cash: total
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
      <div className="details">
        <div className="first-part">
          <p className="shipping">Shipping Details</p>
          <p className="itemsNumber">
            ({sum}) {sum === 1 ? "Item" : "Items"}, ${total}
          </p>
        </div>
        <div className="first">
          <div className="colum">
            <label className="label-first">First name</label>

            <input
              onChange={(e) => handleInput(e)}
              type="text"
              className="firstName"
              name="FirstName"
              value={shippingDetails.FirstName}
            />
          </div>
          <div className="colum">
            <label className="label-first">Last name</label>
            <input
              name="LastName"
              value={shippingDetails.LastName}
              onChange={(e) => handleInput(e)}
              type="text"
              className="firstName"
            />
          </div>
          <div className="colum">
            <label>Mobile</label>
            <input
              name="Mobile"
              value={shippingDetails.Mobile}
              onChange={(e) => handleInput(e)}
              type="number"
              className="firstName"
            />
          </div>
        </div>
        <div className="second-part">
          <div className="colum">
            <label>City</label>
            <input
              name="City"
              value={shippingDetails.City}
              onChange={(e) => handleInput(e)}
              type="text"
              className="firstName"
            />
          </div>
          <div className="colum">
            <label>State</label>
            <input
              name="State"
              value={shippingDetails.State}
              onChange={(e) => handleInput(e)}
              type="text"
              className="firstName"
            />
          </div>
        </div>
        <div className="address">
          <label>Address</label>
          <textarea
            name="Address"
            value={shippingDetails.Address}
            onChange={(e) => handleInput(e)}
            className="address-input"
          ></textarea>
        </div>
        <div className="handle-btn">
          <div className="backTOCart">
            <Link className="style" to="/Cart">
              <button className="backCart">Back to Cart</button>
            </Link>
          </div>
          <div className="placeOrder">
            <button onClick={() => placeOrder(cart)} className="backCart">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

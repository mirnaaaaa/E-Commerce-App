import { FaHeart, FaRegHeart } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { AiOutlineDelete } from "react-icons/ai";
import { FavoriteContext } from "../Context/FavoriteContext";
import { CartType } from "../Context/CartContext";
import { FavoriteType } from "../Context/FavoriteContext";

export default function Cart() {
  const { cart, setCart, addToCart, total, sum } = useContext(
    CartContext
  ) as CartType;
  const { addToFavorite, removeFromFav, favoriteList } = useContext(
    FavoriteContext
  ) as FavoriteType;

  const handleRemove = (id: number, q: number) => {
    if (q === 1) {
      // const docRef = doc(db,`usersDetails/${props.userId}/cartItems/${id.ID}`);
      //deleteDoc(docRef)
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

  const removeAll = () => {
    setCart([]);
  };

  return (
    <div className="shopping-cart">
      <div>
        {cart.length === 0 ? <h1 className="cartEmpty"> Cart: (Empty)</h1> : ""}
        <div className="theCart">
          {cart.map((item) => (
            <div key={item.id} className="Cart-items">
              <img className="pic" alt="itemImage" src={item.images[2]} />
              <div className="favorite">
                <h1 className="product-name">
                  Name:
                  {item.title}
                </h1>
                <div className="isFav">
                  {favoriteList.find((x) => x.id === item.id) ? (
                    <FaHeart
                      className="hearts"
                      onClick={() => removeFromFav(item)}
                      style={{ color: "red", fontSize: "15px" }}
                    />
                  ) : (
                    <FaRegHeart
                      className="hearts-2"
                      onClick={() => addToFavorite(item)}
                      style={{ color: "red", fontSize: "15px" }}
                    />
                  )}
                </div>
              </div>
              <p className="dis">{item.description}</p>
              <div className="money">
                <h3 className="oldDollar">Price: ${item.price}</h3>
                <h3>discount: {item.discountPercentage}%</h3>
                <h3 className="dollar">
                  Total: $
                  {item.quantity > 1
                    ? (
                        (item.price * item.quantity * item.discountPercentage) /
                        100
                      ).toFixed(2)
                    : ((item.price * item.discountPercentage) / 100).toFixed(2)}
                </h3>
              </div>

              <p className="left">{item.stock} left in the Store</p>
              <div className="removeId">
                <div className="negative">
                  <button
                    className="remove"
                    onClick={() => handleRemove(item.id, item.quantity)}
                  >
                    -
                  </button>
                </div>
                <h2 className="havingItems"> ({item.quantity}) </h2>
                <div className="positive">
                  <button className="remove" onClick={() => addToCart(item)}>
                    +
                  </button>
                </div>
              </div>
              <AiOutlineDelete
                onClick={() => deleteItem(item.id)}
                className="delete-Item"
              />
            </div>
          ))}
        </div>
      </div>
      {cart.length !== 0 && (
        <div className="del">
          <div className="remove-pad">
            <button className="removeAll" onClick={removeAll}>
              Remove All
            </button>
          </div>
          <div className="totalCost">
            <h2 className="shipping">shipping: $50</h2>
            <h2 className="total">total price: ${total}</h2>

            <div className="check">
              <Link to="/CheckOut">
                <button className="letsCheck">
                  CHECKOUT(
                  {sum})
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

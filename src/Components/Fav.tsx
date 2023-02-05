import React from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { FavoriteContext } from "../Context/FavoriteContext";
import { CartContext } from "../Context/CartContext";
import { CartType } from "../Context/CartContext";
import { FavoriteType } from "../Context/FavoriteContext";

export default function Fav() {
  const { removeFromFav, favoriteList, setFavoriteList } = useContext(
    FavoriteContext
  ) as FavoriteType;
  const { addToCart } = useContext(CartContext) as CartType;

  //const removeAll = async() => {
  // const changeFav = props.ourShop.map(x =>
  //({...x, isFav: false} )
  //)
  //     props.setOurShop(changeFav)

  //const docRef = collection(db,`usersDetails/${userId}/FavoriteList`);
  //const q = query(docRef, where("isFav", "==", true));
  //const querySnapshot = await getDocs(q);
  //querySnapshot.forEach((doc) => {
  /// deleteDoc(doc.ref);
  //});
  //const docCart = collection(db,`usersDetails/${userId}/cartItems`);
  //const Query = query(docCart, where("isFav", "==", true));
  // const snap = await getDocs(Query);
  // snap.docs.map((doc) => {
  //updateDoc(doc.ref, {
  // isFav: false
  // });
  // });

  // }
  const removeAll = () => {
    setFavoriteList([]);
  };
  return (
    <div className="handleWithFooter">
      {favoriteList.length === 0 && (
        <div className="empty">
          <h1 className="favEmpty">
            You currently have nothing added to your favorite list.
          </h1>
          <div className="shopNow-space">
            <button className="shopNow">
              <Link className="shopLink" to="/">
                Shop Now
              </Link>
            </button>
          </div>
        </div>
      )}
      <div className="theShop">
        {favoriteList.map((item) => (
          <div key={item.id} className="items">
            <img className="pic" src={item.images[2]} alt="productPicture" />
            <div className="favorite">
              <h1 className="product-name">
                Name:
                {item.title}
              </h1>
              <div className="isFav">
                <FaHeart
                  className="hearts"
                  onClick={() => removeFromFav(item)}
                  style={{ color: "red", fontSize: "15px" }}
                />
              </div>
            </div>
            <p className="dis">{item.description}</p>
            <div className="money">
              <h3 className="dollar">Price: ${item.price}</h3>
              <h3 className="off">Discount: {item.discountPercentage}%</h3>
            </div>

            <p className="left"> {item.stock} left in the Store</p>
            <div className="add">
              <button className="toCart" onClick={() => addToCart(item)}>
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      {favoriteList.length !== 0 && (
        <>
          <div className="removeFav">
            <button className="removeFav-btn" onClick={removeAll}>
              Remove All
            </button>
          </div>
        </>
      )}
    </div>
  );
}

import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FavoriteContext } from "../Context/FavoriteContext";
import { CartContext } from "../Context/CartContext";
import { useContext } from "react";
import { CartType } from "../Context/CartContext";
import { ProductType } from "../Type";
import { FavoriteType } from "../Context/FavoriteContext";

interface PostsProps {
  item: ProductType;
}

export default function SelectCategory({ item }: PostsProps) {
  const { removeFromFav, addToFavorite, favoriteList } = useContext(
    FavoriteContext
  ) as FavoriteType;
  const { addToCart } = useContext(CartContext) as CartType;

  return (
    <div>
      <div className="items">
        <img className="pic" src={item.images[2]} alt="productPicture" />
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
    </div>
  );
}

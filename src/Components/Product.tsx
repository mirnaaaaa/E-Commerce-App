import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { FavoriteContext } from "../Context/FavoriteContext";
import { CartType } from "../Context/CartContext";
import { ProductType } from "../Type";
import { FavoriteType } from "../Context/FavoriteContext";

interface PostsProps {
  item: ProductType;
}

export default function Product({ item }: PostsProps) {
  const { addToCart } = useContext(CartContext) as CartType;
  const { addToFavorite, favoriteList, removeFromFav } = useContext(
    FavoriteContext
  ) as FavoriteType;

  return (
    <div className="items">
      <Link to={`/ItemDetails/${item.title}`}>
        <img alt="productPicture" className="pic" src={item.images[0]} />
      </Link>
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
      <div className="money">
        <h3 className="dollar">Price: ${item.price}</h3>
        <h3 className="off">Discount: {item.discountPercentage}%</h3>
      </div>
      <div className="add">
        <button className="toCart" onClick={() => addToCart(item)}>
          Add To Cart
        </button>
      </div>
    </div>
  );
}

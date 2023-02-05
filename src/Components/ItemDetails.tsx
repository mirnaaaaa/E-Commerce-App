import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import { useContext } from "react";
import { ProductsContext } from "../Context/ProductsContext";
import { useParams } from "react-router-dom";
import { FavoriteContext } from "../Context/FavoriteContext";
import { CartContext } from "../Context/CartContext";
import { CartType } from "../Context/CartContext";
import { ProductsType } from "../Context/ProductsContext";
import { FavoriteType } from "../Context/FavoriteContext";
import { ProductType } from "../Type";

export default function ItemDetails() {
  const [product, setProduct] = useState<ProductType>();
  const { ourShop } = useContext(ProductsContext) as ProductsType;
  const { addToCart } = useContext(CartContext) as CartType;
  const { addToFavorite, favoriteList, removeFromFav } = useContext(
    FavoriteContext
  ) as FavoriteType;
  const { id } = useParams();

  useEffect(() => {
    const correct = ourShop.find((x) => x.title === id);
    if (correct) {
      setProduct(correct);
    }
  }, [id, ourShop]);

  return (
    <div className="try">
      {product && (
        <div className="detailsContainer">
          <div className="rows">
            {product.images.map((x, index) => (
              <div className="Picture" key={index}>
                <img alt="itemPicture" className="detailsPicture" src={x} />
              </div>
            ))}
          </div>

          <div className="containers">
            <div className="handleTitleWithFav">
              <h1 className="DetailsTitle">Name: {product.title}</h1>
              <div className="isFavDetails">
                {favoriteList.find((z) => z.id === product.id) ? (
                  <FaHeart
                    className="heartsDetails"
                    onClick={() => removeFromFav(product)}
                    style={{ color: "red", fontSize: "15px" }}
                  />
                ) : (
                  <FaRegHeart
                    className="hearts-2Details"
                    onClick={() => addToFavorite(product)}
                    style={{ color: "red", fontSize: "15px" }}
                  />
                )}
              </div>
            </div>
            <h1 className="DetailsBrand">Brand: {product.brand}</h1>
            <h1 className="DetailsCategory">category: {product.category}</h1>
            <h1 className="DetailsPrice">Price: ${product.price}</h1>
            <h1 className="DetailsDis">
              Discount: {product.discountPercentage}%
            </h1>
            <p className="Details">Description: {product.description}</p>
            <h1 className="DetailsRating">
              Reviews: {product.rating}{" "}
              {product.rating >= 4 && product.rating < 4.5 && (
                <>
                  <AiTwotoneStar /> <AiTwotoneStar /> <AiTwotoneStar />{" "}
                  <AiTwotoneStar /> <AiOutlineStar />
                </>
              )}
              {product.rating >= 4.5 && (
                <>
                  <AiTwotoneStar /> <AiTwotoneStar /> <AiTwotoneStar />{" "}
                  <AiTwotoneStar /> <AiTwotoneStar />{" "}
                </>
              )}
            </h1>
            <h1 className="DetailsLeft">{product.stock} left in the stock</h1>

            <div className="adds">
              <button className="toCart" onClick={() => addToCart(product)}>
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React from "react";
import Product from "./Product";
import { useContext } from "react";
import { ProductsContext } from "./../Context/ProductsContext";
export default function Shop() {
  const { ourShop } = useContext(ProductsContext);
  return (
    <div className="center">
      <div className="theShop">
        {ourShop.map((item) => (
          <div key={item.id}>
            <Product item={item} />
          </div>
        ))}
        ;
      </div>
    </div>
  );
}

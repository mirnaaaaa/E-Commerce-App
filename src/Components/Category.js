import React, { useState } from "react";
import { useContext } from "react";
import { ProductsContext } from "../Context/ProductsContext";
import SelectedCategory from "./SelectedCategory";
export default function Category() {
  const { ourShop } = useContext(ProductsContext);
  const [categories, setCategories] = useState([]);
  const choose = (item) => {
    const filter = ourShop.filter((x) => {
      return x.category === item;
    });
    setCategories(filter);
  };
  return (
    <div className="handleWithFooter">
      <div className="CategoryButtons">
        <div className="mobile">
          <button className="btn-items" onClick={() => choose("smartphones")}>
            smartphones
          </button>
        </div>
        <div className="mobile">
          <button className="btn-items" onClick={() => choose("laptops")}>
            laptops
          </button>
        </div>
        <div className="mobile">
          <button className="btn-items" onClick={() => choose("skincare")}>
            skincare
          </button>
        </div>
        <div className="mobile">
          <button className="btn-items" onClick={() => choose("fragrances")}>
            fragrances
          </button>
        </div>
        <div className="mobile">
          <button className="btn-items" onClick={() => choose("groceries")}>
            groceries
          </button>
        </div>
        <div className="mobile">
          <button
            className="btn-items"
            onClick={() => choose("home-decoration")}
          >
            home-decoration
          </button>
        </div>
      </div>
      <div className="theShop">
        {categories.map((item) => (
          <div key={item.id}>
            <SelectedCategory item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

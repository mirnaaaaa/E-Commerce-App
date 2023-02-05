import React, { useState } from "react";
import Product from "./Product";
import { useContext } from "react";
import { ProductsContext } from "../Context/ProductsContext";
import { ProductsType } from "../Context/ProductsContext";
import { FcSearch } from "react-icons/fc";

export default function Shop() {
  const { ourShop } = useContext(ProductsContext) as ProductsType;
  const [search, setSearch] = useState<string>("");

  const filter = ourShop.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.brand.toLowerCase().includes(search.toLowerCase())
  );

  const canNotFind = search && filter.length === 0 && (
    <div className="can-not-find">
      <h1 className="your-search">
        Your search ({search}) didn't match any products.
      </h1>
      <li>Try something else</li>
      <li>Check your spelling</li>
    </div>
  );

  return (
    <div className="center">
      <div className="search-div">
        <input
          className="search-input"
          placeholder="Search here..."
          type="text"
          value={search}
          name="search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <FcSearch className="search-icon" />
      </div>

      {canNotFind}
      <div className="theShop">
        {filter.map((item) => (
          <div key={item.id}>
            <Product item={item} />
          </div>
        ))}
        ;
      </div>
    </div>
  );
}

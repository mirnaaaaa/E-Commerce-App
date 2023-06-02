import React, { useState } from "react";
import Product from "./Product";
import { useContext } from "react";
import { ProductsContext } from "../Context/ProductsContext";
import { ProductsType } from "../Context/ProductsContext";
import { Box, Typography } from "@mui/material";
import Category from "./Category";
import PlayForWorkIcon from "@mui/icons-material/PlayForWork";

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
    <div>
      <Category />
      <Box>
        <Typography variant="h5" sx={{ color: "#004d40",display:"flex", justifyContent:" center" }}>
          All Items
          <PlayForWorkIcon sx={{ paddingTop: "2px" }} />
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {filter.map((item) => (
          <Box sx={{ m: 4, maxWidth: "250px" }} key={item.id}>
            <Product item={item} />
          </Box>
        ))}
        ;
      </Box>
    </div>
  );
}

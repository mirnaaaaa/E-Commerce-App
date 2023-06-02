import React, { useState } from "react";
import { useContext } from "react";
import { ProductsContext } from "../Context/ProductsContext";
import SelectedCategory from "./SelectedCategory";
import { ProductsType } from "../Context/ProductsContext";
import { ProductType } from "../Type";
import { AppBar, Box, Button, Stack, Divider, Typography } from "@mui/material";

export default function Category() {
  const { ourShop } = useContext(ProductsContext) as ProductsType;
  const [categories, setCategories] = useState<ProductType[]>([]);

  const choose = (item: string) => {
    const filter = ourShop?.filter((x) => {
      return x.category === item;
    });
    setCategories(filter);
  };

  return (
    <div>
      <AppBar
        sx={{
          marginTop: "57px",
          bgcolor: "#e0f2f1",
          height: "55px",
          paddingBottom: "50px"
        }}
      >
        <Stack m={1} display= "flex"  alignItems="center" >
          <Stack spacing={4} direction="row">
            <Typography variant="h5"  color="#004d40">
              Shop by Category
            </Typography>
            <Button variant="outlined" onClick={() => choose("groceries")}>
              groceries
            </Button>
            <Button
              color="error"
              variant="outlined"
              onClick={() => choose("skincare")}
            >
              skincare
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => choose("smartphones")}
            >
              smartphones
            </Button>
            <Button
              color="info"
              variant="outlined"
              onClick={() => choose("laptops")}
            >
              laptops
            </Button>
            <Button
              color="warning"
              variant="outlined"
              onClick={() => choose("fragrances")}
            >
              fragrances
            </Button>
            <Button
              color="success"
              variant="outlined"
              onClick={() => choose("home-decoration")}
            >
              home-decoration
            </Button>
          </Stack>
        </Stack>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          paddingTop: "85px"
        }}
        m={3}
      >
        {categories?.map((item) => (
          <Box sx={{ m: 4, maxWidth: "250px" }} key={item.id}>
            <SelectedCategory item={item} />
          </Box>
        ))}
        <Divider sx={{ width: "100%", color: "#004d40" }} />
      </Box>
    </div>
  );
}

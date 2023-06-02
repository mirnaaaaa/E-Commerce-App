import React from "react";
import { Paper, Typography } from "@mui/material";

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <Paper
      sx={{
        marginTop: "calc(10% + 60px)",
        position: "fixed",
        bottom: 0,
        width: "100%",
        bgcolor: "#004d40",
        display: "flex",
        justifyContent: "center",
        height: "45px",
        alignItems: "center",
        color: "white"
      }}
      component="footer"
      square
    >
      <Typography>@copy;{year} All Rights Reserved.</Typography>
    </Paper>
  );
}

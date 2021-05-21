import React from "react";
import { Paper, Typography, Grid } from "@material-ui/core";

interface MenuItemProps {
  name: string;
  price: number;
  quantity: number;
}

const MenuItemCard = (props: MenuItemProps) => {
  const { name, price, quantity } = props;
  const description = "lorem ipsum descriptiones";
  return (
    <Paper>
      <Grid container>
        <Grid item xs={8}>
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography>{name}</Typography>
            <Typography>{description}</Typography>
            <Typography>{price} RON</Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MenuItemCard;

import React from "react";
import { Paper, Typography, Grid } from "@material-ui/core";

interface MenuItemProps {
  name: string;
  price: number;
  photoHref: string;
}
const MenuItemCard = (props: MenuItemProps) => {
  const { name, price, photoHref } = props;
  const description = "lorem ipsum descriptiones";
  return (
    <Paper>
      <Grid container>
        <Grid item xs={4}>
          <img src={photoHref} width={"100%"} />
        </Grid>
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

import React, { } from "react";
import { Typography, Button } from "@material-ui/core";
import { AddCircle, RemoveCircle } from "@material-ui/icons";
import MenuItem from "../../../models/MenuItem";

interface ItemQuantity {
  item: MenuItem;
  quantity: number;
}
interface IProps {
  menuItem: ItemQuantity,
  setOrder: Function,
}

const MenuItemComponent = ({ menuItem, setOrder }: IProps) => {

  const handleAdd = () => {
    setOrder((prev) =>
      prev.map(({ item, quantity }) => item.name === menuItem.item.name ? ({ item, quantity: quantity + 1 }) : ({ item, quantity }))
    );
  };

  const handlerRemove = () => {
    setOrder((prev) =>
      prev.map(({ item, quantity }) => item.name === menuItem.item.name ? ({ item, quantity: Math.max(0, quantity - 1) }) : ({ item, quantity }))
    );
  };

  return (
    <div className="flex center">

      <Typography className="flex-1"> {`${menuItem.item.name}: ${menuItem.item.price} RON / ${menuItem.item.quantity}g`} </Typography>

      <div className="flex center">
        <Button onClick={handlerRemove}> <RemoveCircle /> </Button>
        <Typography> {menuItem.quantity} </Typography>
        <Button onClick={handleAdd}  color="secondary"> <AddCircle /> </Button>
      </div>

    </div>
  );
}

export default MenuItemComponent

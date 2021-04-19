import React from "react";
import { AppBar } from "@material-ui/core";

export default function TopNav() {
  return (
    <AppBar position="static" color="primary">
      <img className="w-5 h-5 p-l-2" alt="company logo" src={"logo.svg"} />
    </AppBar>
  );
}

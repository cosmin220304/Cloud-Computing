import React from "react";
import { AppBar } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function TopNav() {
  return (
    <AppBar position="static" color="primary">
      <Link to="/"><img className="w-5 h-5 p-l-2 pointer" alt="company logo" src={"logo_white.svg"} /> </Link>
    </AppBar>
  );
}

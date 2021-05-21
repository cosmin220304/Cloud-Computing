import React from "react";
import { AppBar } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function TopNav() {
  let history = useHistory();

  function handleClick() {
    history.push("/");
  }

  return (
    <AppBar position="static" color="primary" onClick={handleClick}>
      <img className="w-5 h-5 p-l-2" alt="company logo" src={"logo_white.svg"} />
    </AppBar>
  );
}

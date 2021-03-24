import React, { useEffect, useReducer } from "react";
import { Container, Paper, Typography } from "@material-ui/core";

type Action = any;
const reducer: React.Reducer<Array<string> | void, Action> = (
  state: Array<string> | void,
  action: Action
) => {
  if (Number(action.type)) {
    return state ? [...state, action.type].slice(0, 4) : [action.type];
  }
  if (action.type === "Backspace") {
    return state ? state.slice(0, -1) : [];
  }
  return state ? [...state] : [];
};

const initialState: Array<string> = [];

export default function ConfirmCodePage() {
  const [validationCode, dispatch] = useReducer(reducer, initialState);

  const handleKeyPress = (event: any) => {
    console.log(event.key);
    dispatch({ type: event.key });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress, true);
    return () => window.removeEventListener("keydown", handleKeyPress, true);
  }, []);

  return (
    <>
      <Container>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "auto",
            alignItems: "center",
          }}
        >
          <Typography>Enter code</Typography>
          <Typography align="center">
            We’ve sent you a code via message
            <br /> please add it bellow
          </Typography>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {(validationCode &&
                [...validationCode, "_", "_", "_", "_"]
                  .slice(0, 4)
                  .map((val) => (
                    <Paper style={{ margin: "1rem", width: "4rem" }}>
                      <Typography variant="h1">{val}</Typography>
                    </Paper>
                  ))) ||
                null}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

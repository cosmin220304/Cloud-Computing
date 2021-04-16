import React, { useState } from "react";
import { Button, Container, TextField, Typography } from "@material-ui/core";
import { useFormik } from "formik";

export default function TellUsMore() {
  const formik = useFormik({
    initialValues: { name: "", surname: "" },
    onSubmit: (values) => {
      console.log(values);
      console.log(genderSelection);
    },
  });
  const [genderSelection, setGenderSelection] = useState([
    { type: "Man", selected: false },
    { type: "Female", selected: false },
    { type: "Other", selected: false },
  ]);
  return (
    <>
      <Container>
        <Typography align="center" variant="h1">
          Tell us about you..
        </Typography>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={formik.handleSubmit}
        >
          <TextField
            name="name"
            label="name"
            variant="outlined"
            onChange={formik.handleChange}
            error={Boolean(formik.errors.name)}
            helperText={
              formik.errors.name &&
              formik.touched.name &&
              String(formik.errors.name)
            }
          />
          <TextField
            name="surname"
            label="surname"
            variant="outlined"
            onChange={formik.handleChange}
            error={Boolean(formik.errors.surname)}
            helperText={
              formik.errors.surname &&
              formik.touched.surname &&
              String(formik.errors.surname)
            }
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            {genderSelection.map((val, idx) => {
              return (
                <a
                  className={
                    genderSelection[idx].selected
                      ? "list-element-selected"
                      : "list-element"
                  }
                  onClick={() =>
                    setGenderSelection((genderSelection) =>
                      genderSelection.map((val, idx2) => ({
                        ...val,
                        selected: idx === idx2,
                      }))
                    )
                  }
                >
                  <Container>
                    <Typography align="center">{val.type}</Typography>
                  </Container>
                </a>
              );
            })}
          </div>
          <Button type="submit">Next</Button>
        </form>
      </Container>
    </>
  );
}

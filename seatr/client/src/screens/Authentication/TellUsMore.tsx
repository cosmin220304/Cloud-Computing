import React, { useState, useContext } from "react";
import { Button, Container, TextField, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import { AuthContext } from "../../utils/AuthContext";
import axios from "axios";

interface Errors {
  name: Boolean,
  surname: Boolean,
  email: Boolean,
}

const noErros: Errors = {
  name: false,
  surname: false,
  email: false,
}

export default function TellUsMore() {
  const [selectedGender, setSelectedGender] = useState<string>("Other");
  const [user, setUser] = useContext(AuthContext);
  const [errors, setErrors] = useState<Errors>(noErros);

  const handleClick = (evt: any) => {
    const newSelectedGender = evt.currentTarget.textContent;
    setSelectedGender(newSelectedGender);
  };

  const getClassForGender = (genderName: string) => {
    if (selectedGender === genderName) {
      return "list-element-selected";
    }
    return "list-element";
  }

  const formik = useFormik({
    initialValues: { 
      name: "", 
      surname: "", 
      email: "" 
    },
    onSubmit: (values) => {
      let newErrors: Errors = noErros;
      let hasErrors = false;
      
      if (values.name === "") {
        newErrors.name = true;
        hasErrors = true;
      }
      if (values.surname === "") {
        newErrors.surname = true;
        hasErrors = true;
      }
      if (values.email === "") {
        newErrors.email = true;
        hasErrors = true;
      }

      setErrors(newErrors)
      if (hasErrors) return;

      const userInfo = {
        phoneNumber: user.phoneNumber,
        uid: user.uid,
        name: values.name,
        surname: values.surname,
        gender: selectedGender,
        email: values.email, 
      }
      axios.post(`/api/user`, {...userInfo}, {withCredentials: true})
      .then(() => setUser({...userInfo, isNewUser: false}))
    },
  });

  return (
    <Container className="m-t-5">
      <Typography className="center-text" variant="h5">
        Tell us about you..
      </Typography>

      <form
        onSubmit={formik.handleSubmit}
        className="flex-column center-children"
      >
        <div className="m-t-2 w-20">
          <TextField
            name="name"
            label="name"
            variant="outlined"
            onChange={formik.handleChange}
            className="w-100p"
            error={true === errors.name}
          />
        </div>

        <div className="m-t-1 w-20">
          <TextField
            name="surname"
            label="surname"
            variant="outlined"
            onChange={formik.handleChange}
            className="w-100p"
            error={true === errors.surname}
          />
        </div>

        <div className="m-t-1 w-20">
          <TextField
            name="email"
            label="email"
            variant="outlined"
            onChange={formik.handleChange}
            className="w-100p"
            error={true === errors.email}
          />
        </div>

        <div className="flex gap-1 m-t-2" id="category">
          <div className={getClassForGender("Man")} id="Man" onClick={handleClick}>
            <Typography align="center">Man</Typography>
          </div>
          <div className={getClassForGender("Woman")} id="Woman" onClick={handleClick}>
            <Typography align="center">Woman</Typography>
          </div>
          <div className={getClassForGender("Other")} id="Other" onClick={handleClick}>
            <Typography align="center">Other</Typography>
          </div>
        </div>

        <br />

        <Button type="submit">Next</Button>
      </form>
    </Container>
  );
}

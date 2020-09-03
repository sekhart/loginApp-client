import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../../api/APIService";
import { ACCESS_TOKEN } from "../../util/constants";

import { Redirect, useHistory, useLocation } from "react-router-dom";

import "../user/login.css";


const initialValues = {
  usernameOrEmail: "",
  password: "",
};

const validationSchema = Yup.object({
  usernameOrEmail: Yup.string().required("username Or Email required!"),
  password: Yup.string().required("Password required!"),
});

const Login = ({ data }) => {
  let history = useHistory();
  const location = useLocation();

  if (data) {
    return <Redirect to="/home" />;
  }

  useEffect(() => {}, [location.pathname]);

  const onSubmit = (values, onSubmitProps) => {
    console.log(values.usernameOrEmail);
    const loginRequest = Object.assign({}, values);
    login(loginRequest)
      .then((response) => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        console.log("Token", response.accessToken);
        history.push("/home");
      })
      .catch((error) => {
        if (error.status === 401) {
          console.log("error 401");
        } else {
          console.log("Sorry something went wrong! please try again", error);
        }
      });
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <div>
          <label htmlFor="usernameOrEmail" >Username</label>
          <Field type="text" id="usernameOrEmail" name="usernameOrEmail" />
          <ErrorMessage name="usernameOrEmail" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Field type="password" id="password" name="password" />
          <ErrorMessage name="password" />
        </div>
        <button type="submit">Login</button>
        <button type="reset">Cancel</button>
      </Form>
    </Formik>
  );
};

export default Login;

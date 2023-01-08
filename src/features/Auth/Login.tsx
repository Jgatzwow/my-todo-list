import React from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  TextField,
} from "@material-ui/core";
import { FormikHelpers, useFormik } from "formik";
import { useSelector } from "react-redux";
import { login } from "./auth-reducer";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "./selectors";
import { authActions } from "./index";
import { useAppDispatch } from "../../utils/redux-utils";
import * as yup from "yup";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

type FormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const Login = () => {
  const dispatch = useAppDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const LoginSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(8).max(20).required("Password is required"),
  });
  const formik = useFormik({
    validationSchema: LoginSchema,
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: async (
      values: FormValuesType,
      formikHelpers: FormikHelpers<FormValuesType>
    ) => {
      const resultAction = await dispatch(authActions.login(values));

      if (login.rejected.match(resultAction)) {
        if (resultAction.payload?.fieldsErrors?.length) {
          const error = resultAction.payload?.fieldsErrors[0];
          formikHelpers.setFieldError(error.field, error.error);
        }
      }
    },
  });

  if (isLoggedIn) {
    return <Navigate to={"/todos"} />;
  }

  return (
    <Grid container justify="center">
      <Grid item xs={4}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered{" "}
                <a
                  href={"https://social-network.samuraijs.com/"}
                  target={"_blank"}
                >
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p> Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                {...formik.getFieldProps("email")}
              />
              {formik.errors.email ? (
                <ErrorMessage>{formik.errors.email}</ErrorMessage>
              ) : null}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps("password")}
              />
              {formik.errors.password ? (
                <ErrorMessage>{formik.errors.password}</ErrorMessage>
              ) : null}
              <FormControlLabel
                label={"Remember me"}
                control={
                  <Checkbox
                    {...formik.getFieldProps("rememberMe")}
                    checked={formik.values.rememberMe}
                  />
                }
              />
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};

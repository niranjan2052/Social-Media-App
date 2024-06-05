import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { inStorage } from "../../lib";
import "./login.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { setUser } from "../../store";
import http from "../../http";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string().required(),
    }),
    onSubmit: (values, { setSubmitting }) => {
      http
        .post("auth/login", values)
        .then(({ data }) => {
          dispatch(setUser(data));
          inStorage("user", JSON.stringify(data));
        })
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          toast.success("logged In successfully");
          setSubmitting(false);
        });

      setSubmitting(false);
    },
  });
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">MERN Social</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on MERN Social
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={formik.handleSubmit}>
            <input
              placeholder="Email"
              type="email"
              name="email"
              id="email"
              defaultValue={formik.values["email"]}
              onChange={formik.handleChange}
              className="loginInput"
              autoComplete="off"
            />
            <input
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              defaultValue={formik.values["password"]}
              onChange={formik.handleChange}
              className="loginInput"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="loginButton"
            >
              {formik.isSubmitting ? (
                <CircularProgress color="inherit" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>

            <Link to="/register" style={{ textAlign: "center" }}>
              <button className="loginRegisterButton">
                Create a New Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

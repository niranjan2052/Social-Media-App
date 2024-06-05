import { useFormik } from "formik";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import http from "../../http";
import YupPassword from "yup-password";
import { toast } from "react-toastify";

YupPassword(Yup);

const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string()
        .required()
        .minLowercase(1)
        .minUppercase(1)
        .minNumbers(1)
        .minSymbols(1),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password")], "Password not Confirmed"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      http
        .post("auth/register", values)
        .then(({ data }) => {
          navigate("/login");
          toast.success(data.message);
        })
        .catch((err) => {
          toast.error(err.message);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });
  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">MERN Social</h3>
          <span className="registerDesc">
            Connect with friends and the world around you on MERN Social
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={formik.handleSubmit}>
            <input
              placeholder="Username"
              name="username"
              id="username"
              defaultValue={formik.values["username"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="registerInput"
            />
            <input
              placeholder="Email"
              name="email"
              id="email"
              defaultValue={formik.values["email"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="registerInput"
            />
            <input
              placeholder="Password"
              name="password"
              id="password"
              defaultValue={formik.values["password"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="registerInput"
            />
            <input
              placeholder="Confirm Password"
              name="confirmPassword"
              id="confirmPassword"
              defaultValue={formik.values["confirmPassword"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="registerInput"
            />
            <button
              type="submit"
              className="registerButton"
              disabled={formik.isSubmitting}
            >
              Sign Up
            </button>
            <Link to="/login" style={{ textAlign: "center" }}>
              <button className="registerRegisterButton">
                Log into Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

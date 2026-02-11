import Input from "../../components/Input/Input";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "./userThunks";
import { useSelector, useDispatch } from "react-redux";
import { resetSubmitReference } from "./userSlice";
import Loading from "../../components/Loading";
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});

  const userState = useSelector((state) => state.userState);
  const { loading, user, submitReference } = userState;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((preValues) => ({ ...preValues, [name]: value }));
  };
  useEffect(() => {
    if (submitReference) {
      resetStates();
      if (user?.role === 1100) {
        navigate("/app/admin/dashboard");
      } else if (user?.role === 1000) {
        navigate("/app/user/dashboard");
      }

      dispatch(resetSubmitReference());
    }
  }, [submitReference, user?.role]);

  const resetStates = () => {
    setFormErrors({});
    setFormValues({
      email: "",
      password: "",
    });
  };

  const validateFormValues = () => {
    const errors = {};
    Object.keys(formValues).forEach((key) => {
      if (!formValues[key]) {
        errors[key] = `${key}  is required`;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateFormValues()) {
      dispatch(login(formValues));
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexFlow: "column nowrap",
          justifyContent: "center",
          padding: "2em",
          boxShadow: "0px 0px 2px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "1.5rem",
            fontWeight: "500",
            padding: ".5em",
            marginBottom: ".5em",
          }}
        >
          Course Master
        </div>

        <Input
          name={"email"}
          value={formValues?.email || ""}
          type="email"
          onChange={handleInputChange}
          placeholder="Enter your Email"
          error={formErrors?.email}
          label={"Email"}
        />

        <Input
          name={"password"}
          value={formValues?.password || ""}
          type="password"
          onChange={handleInputChange}
          placeholder="Enter your password"
          error={formErrors?.password}
          label={"Password"}
        />

        <div>
          <p>
            <Link to="/sign-up">New User ?</Link>
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: ".5em",
          }}
        >
          <button className="btn btn-primary" onClick={handleSubmit}>
            Sign In
          </button>

          {loading && <Loading />}
        </div>
      </div>
    </div>
  );
};

export default SignIn;

import Input from "../../components/Input/Input";
import { useState } from "react";
import { Link } from "react-router-dom";
const SignIn = () => {
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((preValues) => ({ ...preValues, [name]: value }));
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
          padding: ".5em",
          boxShadow: "0px 0px 2px",
        }}
        className="credential-container"
      >
        <div>Course Master</div>

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
        <div>
          <button className="btn btn-primary">Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

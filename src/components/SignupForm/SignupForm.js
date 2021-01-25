import { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { useFlash } from "../../hooks/use-flash-message";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input, Form } from "../FormComponents";

const schema = yup.object().shape({
  username: yup
    .string()
    .required("A username is required")
    .min(3, "Usernames must be between 3-20 characters in length")
    .max(20, "Usernames must be between 3-20 characters in length")
    .trim()
    .matches(/^[_a-zA-Z0-9]*$/, {
      message: "cannot contain special characters or spaces",
    }),
  password: yup.string().required("Password is required").min(6).max(40),
  password2: yup
    .string()
    .required("Please re-enter password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  email: yup
    .string()
    .required("An email is required")
    .email("Must be a valid email"),
});

const SignupForm = () => {
  const [error, setError] = useState(null);
  const auth = useAuth();
  const flash = useFlash();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { username, password, email } = data;
    try {
      const response = await auth.signup(username, password, email);
      if (response.user) {
        flash.changeMessage("Account created successfully! Please log in.");
        history.push("/login");
      } else if (response.errors) {
        console.log(response);
        setError(response.errors[0].msg);
      } else {
        setError("Something went wrong.");
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Form
      handleSubmit={handleSubmit(onSubmit)}
      title="Sign Up"
      error={error}
      art="2"
      button="Create Account"
    >
      <Input
        name="username"
        label="Username"
        type="text"
        placeholder=""
        ref={register}
        error={errors.username ? errors.username.message : null}
      />
      <Input
        name="email"
        label="Email"
        type="text"
        placeholder="example@example.com"
        ref={register}
        error={errors.email ? errors.email.message : null}
      />
      <Input
        name="password"
        label="Password"
        type="password"
        placeholder=""
        ref={register}
        error={errors.password ? errors.password.message : null}
      />
      <Input
        name="password2"
        label="Confirm Password"
        type="password"
        placeholder=""
        ref={register}
        error={errors.password2 ? errors.password2.message : null}
      />
    </Form>
  );
};

export default SignupForm;

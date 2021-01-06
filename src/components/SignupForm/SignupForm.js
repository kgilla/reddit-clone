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
    .required()
    .min(3)
    .max(20)
    .trim()
    .matches(/^[_a-zA-Z0-9]*$/, {
      message: "cannot contain special characters or spaces",
    }),
  password: yup.string().required().min(6).max(40),
  email: yup.string().required().email(),
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
        name="password"
        label="Password"
        type="text"
        placeholder=""
        ref={register}
        error={errors.password ? errors.password.message : null}
      />
      <Input
        name="email"
        label="Email"
        type="text"
        placeholder="example@example.com"
        ref={register}
        error={errors.email ? errors.email.message : null}
      />
    </Form>
  );
};

export default SignupForm;

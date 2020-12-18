import { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Input } from "../FormComponents";

const schema = yup.object().shape({
  username: yup.string().required().min(3).max(20).trim(),
  password: yup.string().required().min(6).max(40).trim(),
});

const LoginForm = ({ changeMessage }) => {
  const [error, setError] = useState(null);
  const history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const auth = useAuth();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { username, password } = data;
    const response = await auth.login(username, password);
    console.log(response);
    if (!response.user) setError(response.message);
    if (response.user) {
      history.replace(from);
      changeMessage(`Welcome back ${response.user.username}`);
    }
  };

  return (
    <Form handleSubmit={handleSubmit(onSubmit)} title="Log In" error={error}>
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
        type="password"
        ref={register}
        error={errors.password ? errors.password.message : null}
      />
    </Form>
  );
};

export default LoginForm;

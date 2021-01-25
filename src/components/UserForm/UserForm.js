import "./UserForm.css";

import { useState } from "react";
import { fetchPutData } from "../../api/";
import { useAuth } from "../../hooks/use-auth";
import { useFlash } from "../../hooks/use-flash-message";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { Input, Form } from "../FormComponents";
import { baseUrl } from "../../config/const";

const passwordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required("Please enter your old password")
    .min(6)
    .max(40),
  password: yup.string().required("New password is required").min(6).max(40),
  password2: yup
    .string()
    .required("Please re-enter password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const emailSchema = yup.object().shape({
  email: yup
    .string()
    .required("An email is required")
    .email("Must be a valid email"),
});

const UserForm = ({ email }) => {
  const [error, setError] = useState(null);
  const auth = useAuth();
  const flash = useFlash();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm({
    resolver: email ? yupResolver(emailSchema) : yupResolver(passwordSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    email ? updateEmail(data) : updatePassword(data);
  };

  const updatePassword = async (data) => {
    const { oldPassword, password, password2 } = data;
    const url = `${baseUrl}/api/users/${auth.user.username}/update_password`;
    try {
      const response = await fetchPutData(
        url,
        { oldPassword, password, password2 },
        auth.token
      );
      if (response.ok) {
        flash.changeMessage("Password successfully updated");
        history.push(`/users/${auth.user.username}`);
      } else {
        const data = await response.json();
        if (data.errors) {
          setError(data.errors[0].msg);
        }
        console.log({ response, data });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateEmail = async (data) => {
    const { email } = data;
    const url = `${baseUrl}/api/users/${auth.user.username}/update_email`;
    try {
      const response = await fetchPutData(url, { email }, auth.token);
      if (response.ok) {
        flash.changeMessage("Email successfully updated");
        history.push(`/users/${auth.user.username}`);
      } else {
        const data = await response.json();
        if (data.errors) {
          setError(data.errors[0].msg);
        }
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const makePasswordForm = () => {
    return (
      <Form
        handleSubmit={handleSubmit(onSubmit)}
        title="Change Password"
        error={error}
        art="2"
        button="Update Password"
      >
        <Input
          name="oldPassword"
          label="Old Password"
          type="text"
          placeholder=""
          ref={register}
          error={errors.oldPassword ? errors.oldPassword.message : null}
        />
        <Input
          name="password"
          label="New Password"
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

  const makeEmailForm = () => {
    return (
      <Form
        handleSubmit={handleSubmit(onSubmit)}
        title="Change Email Address"
        error={error}
        art="2"
        button="Update Email"
      >
        <Input
          name="email"
          label="New Email"
          type="text"
          placeholder="example@example.com"
          ref={register}
          error={errors.email ? errors.email.message : null}
        />
      </Form>
    );
  };

  return email ? makeEmailForm() : makePasswordForm();
};

export default UserForm;

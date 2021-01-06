import { fetchPostData } from "../../api";
import { useAuth } from "../../hooks/use-auth";
import { useFlash } from "../../hooks/use-flash-message";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input, Form, Textarea } from "../FormComponents";

const schema = yup.object().shape({
  name: yup
    .string()
    .required()
    .min(3)
    .max(20)
    .trim()
    .matches(/^[_a-zA-Z0-9]*$/, {
      message: "cannot contain special characters or spaces",
    }),
  description: yup.string().required().min(6).max(600),
});

const SubForm = ({ edit }) => {
  const auth = useAuth();
  const flash = useFlash();
  const history = useHistory();

  const [error, setError] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetchPostData(
        `http://localhost:3000/api/s/create`,
        data,
        auth.token
      );
      if (response.errors) {
        setError(response.errors[0].msg);
      } else if (response.sub) flash.changeMessage("New community created!");
      history.push(`/s/${response.sub._id}`);
    } catch (err) {
      setError(err);
      console.log("something wrong in sub creation");
    }
  };

  return (
    <Form
      handleSubmit={handleSubmit(onSubmit)}
      title="Create Community"
      error={error}
      art="1"
      button="Create Community"
    >
      <Input
        name="name"
        label="Community Name"
        type="text"
        placeholder="3-20 characters"
        ref={register}
        error={errors.name ? errors.name.message : null}
      />
      <Textarea
        name="description"
        label="Description"
        placeholder="min 6 characters"
        ref={register}
        error={errors.description ? errors.description.message : null}
      />
      <Input name="color" label="Community Color" type="color" ref={register} />
    </Form>
  );
};

export default SubForm;

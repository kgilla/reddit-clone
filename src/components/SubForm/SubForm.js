import { useState, useEffect } from "react";
import { fetchGetData } from "../../api";
import { useAuth } from "../../hooks/use-auth";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
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

const SubForm = ({ user, token }) => {
  const [allSubs, setAllSubs] = useState(null);
  const auth = useAuth();
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGetData("http://localhost:3000/api/s/");
      setAllSubs(data.allSubs);
    };
    fetchData();
  }, []);

  // const response = await fetchPostData(
  //   `http://localhost:3000/api/s/create`,
  //   {
  //     name,
  //     description,
  //     color,
  //     image
  //   },
  //   user.token
  // );

  return (
    <Form handleSubmit={handleSubmit(onSubmit)} title="Create Community">
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

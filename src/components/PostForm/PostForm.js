import { fetchGetData, fetchPostData } from "../../api/index";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input, Textarea, Form, Select } from "../FormComponents";

const schema = yup.object().shape({
  title: yup
    .string()
    .required()
    .min(3)
    .max(300)
    .trim()
    .matches(/^[ a-zA-Z0-9]*$/, {
      message: "cannot contain special characters",
    }),
  content: yup.string().required().min(6).max(40),
});

const PostForm = () => {
  const auth = useAuth();
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const { subID } = useParams() || "";
  const [subs, setSubs] = useState(null);

  const onSubmit = (data) => {
    console.log(data);
    history.push(`/s/${data.sub}/`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchGetData(
        "http://localhost:3000/api/s/user",
        auth.token
      );
      setSubs(response.subs);
    };
    fetchData();
  }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const response = await fetchPostData(
  //     `http://localhost:3000/api/s/${sub}/posts/create`,
  //     {
  //       sub,
  //       title,
  //       content,
  //     },
  //     auth.token
  //   );
  //   console.log(response);
  //   setPostCreated(response.savedPost);
  // };

  return (
    <Form handleSubmit={handleSubmit(onSubmit)} title="New Post">
      {subs ? (
        <Select
          name="sub"
          label="Community"
          defaultValue={subID}
          optionsArray={subs}
          ref={register}
          error={errors.sub ? errors.sub.message : null}
        />
      ) : null}
      <Input
        name="title"
        type="text"
        label="Title"
        placeholder=""
        ref={register}
        error={errors.title ? errors.title.message : null}
      />
      <Textarea
        name="content"
        label="Content"
        ref={register}
        error={errors.content ? errors.content.message : null}
      />
    </Form>
  );
};

export default PostForm;

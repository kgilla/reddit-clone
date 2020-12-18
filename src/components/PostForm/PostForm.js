import { fetchGetData, createPost } from "../../api/index";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input, Textarea, Form, Select } from "../FormComponents";

const schema = yup.object().shape({
  title: yup.string().required().min(3).max(300).trim(),
  content: yup.string().max(2000).trim(),
});

const PostForm = ({ changeMessage }) => {
  const auth = useAuth();
  const history = useHistory();
  const { subID } = useParams() || "";

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const [subs, setSubs] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    const response = await createPost(data, auth.token);
    console.log(response);
    if (response.savedPost) {
      changeMessage(response.message);
      history.push(`/s/${data.sub}/posts/${response.savedPost._id}`);
    } else {
      setError("Something went wrong");
    }
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

  return (
    <Form handleSubmit={handleSubmit(onSubmit)} title="New Post" error={error}>
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
        placeholder="What did you want everyone to know about?"
        ref={register}
        error={errors.title ? errors.title.message : null}
      />
      <Textarea
        name="content"
        label="Content"
        placeholder="optional"
        ref={register}
        error={errors.content ? errors.content.message : null}
      />
    </Form>
  );
};

export default PostForm;

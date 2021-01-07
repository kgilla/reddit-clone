import { fetchPostData, fetchGetData, fetchPutData } from "../../api";
import { useAuth } from "../../hooks/use-auth";
import { useFlash } from "../../hooks/use-flash-message";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input, Form, Textarea } from "../FormComponents";

const SubForm = ({ edit }) => {
  const { subID } = useParams() || "";
  const auth = useAuth();
  const flash = useFlash();
  const history = useHistory();

  const [error, setError] = useState(null);

  useEffect(() => {
    const getSubData = async () => {
      const response = await fetchGetData(`http://localhost:3000/api/s/${subID}
      `);
      setValue("name", response.sub.name);
      setValue("description", response.sub.description);
      setValue("color", response.sub.color);
    };
    if (edit) getSubData();
  }, [edit]);

  const makeSchema = () => {
    if (edit) {
      return yup.object().shape({
        description: yup.string().required().min(6).max(600),
      });
    } else {
      return yup.object().shape({
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
    }
  };

  const { register, handleSubmit, setValue, errors } = useForm({
    resolver: yupResolver(makeSchema()),
  });

  const onSubmit = (data) => {
    edit ? updateSub(data) : createSub(data);
  };

  const createSub = async (data) => {
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

  const updateSub = async (data) => {
    try {
      const response = await fetchPutData(
        `http://localhost:3000/api/s/${subID}/update`,
        data,
        auth.token
      );
      if (response.ok) {
        history.push(`/s/${subID}`);
      } else {
        console.log("errorsss");
      }
    } catch (err) {
      setError(err);
      console.log("something wrong in sub creation");
    }
  };

  return (
    <Form
      handleSubmit={handleSubmit(onSubmit)}
      title={edit ? "Update Community" : "Create Community"}
      error={error}
      art="1"
      button={edit ? "Save Changes" : "Create Community"}
    >
      <Input
        name="name"
        label="Community Name"
        type="text"
        placeholder="3-20 characters"
        disabled={edit ? "disabled" : null}
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

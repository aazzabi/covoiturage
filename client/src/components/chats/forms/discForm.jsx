import React, { useState } from "react";
import InputForm from "./inputForm";
import Button from "./button";
import useForm from "./useForm";

const DiscForm = ({ label, onSubmit, validate }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { values, errors, handleChange, handleSubmit } = useForm(
    doSubmit,
    validate
  );

  const { title } = values;

  function doSubmit() {
    setIsLoading(true);

    const onSubmitCallback = () => setIsLoading(false);

    onSubmit(title, onSubmitCallback);
  }



  return (
    <form onSubmit={handleSubmit}>


      <InputForm
        type="text"
        placeholder="Title"
        errors={errors.title}
        value={title || ""}
        onChange={handleChange}
        maxLength="50"
        autoFocus
        disabled={isLoading}
      />
      <Button disabled={isLoading}>
        <b>{isLoading ? "..." : label}</b>
      </Button>
    </form>
  );
};

export default DiscForm;

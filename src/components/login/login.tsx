"use client";
import { FormEvent, useState } from "react";
import Input from "../input/input";
import { loginFields } from "@/constants/formFields";
import FormExtra from "../formExtra/formExtra";
import FormAction from "../formAction/formAction";

const fields: LoginFields[] = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));
// console.log({ fieldsState });

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    authenticateUser();
  };

  //Handle Login API Integration here
  const authenticateUser = () => {};

  return (
    <form className="mt-8 space-y-6 px-4 sm:px-8 pb-5">
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id as keyof typeof loginState]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>
      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}

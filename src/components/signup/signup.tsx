"use client"
import { signupFields } from "@/constants/formFields";
import React, { useState } from "react";
import FormAction from "../formAction/formAction";
import Input from "../input/input";

interface LoginFields {
  id: string;
  name: string;
  labelText: string;
  labelFor: string;
  type: string;
  isRequired: boolean;
  placeholder: string;
}

const fields: LoginFields[] = signupFields;
let fieldsState: Record<string, string> = {};
fields.forEach((field) => (fieldsState[field.name] = ""));

const Signup = () => {
  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSignupState({ ...signupState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(signupState)
      });

      if (res.ok) {
        const form = e.target as HTMLFormElement;
        form.reset();
      } else {
        throw new Error("Failed to create account");
      }
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  return (
    <form className="mt-8 space-y-6 px-4 sm:px-8 pb-5" onSubmit={handleSubmit}>
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.name]}
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
      <FormAction handleSubmit={handleSubmit} text="Signup" />
    </form>
  );
};

export default Signup;

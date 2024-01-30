'use client'
import { signupFields } from "@/constants/formFields";
import React, { useState } from "react";
import FormAction from "../formAction/formAction";
import Input from "../input/input";
const fields: LoginFields[] = signupFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const Signup = () => {
  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSignupState({ ...signupState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(signupState);
    createAccount();
  };

  //handle Signup API Integration here
  const createAccount = () => {};
  return (
    <form className="mt-8 space-y-6 px-4 sm:px-8 pb-5">
      <div className="">
        {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id as keyof typeof signupState]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
        </div>

      <FormAction handleSubmit={handleSubmit} text="Signup" />
    </form>
  );
};

export default Signup;

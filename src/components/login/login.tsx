"use client";
import { FormEvent, useEffect, useReducer, useState } from "react";
import Input from "../input/input";
import { loginFields } from "@/constants/formFields";
import FormExtra from "../formExtra/formExtra";
import FormAction from "../formAction/formAction";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LoginState {
  email: string;
  password: string;
}

const fields: LoginFields[] = loginFields;

export default function Login() {
  const router = useRouter();
  const session = useSession();
  useEffect(()=>{
    console.log(session?.status)
    if(session?.status === "authenticated"){
      router.push('/')
    }
  },[session?.status])
  const [loginState, setLoginState] = useState<LoginState>({
    email: "",
    password: "",
  });

  

  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<ApiResponse>({
    status: "",
    message: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLoginState({ ...loginState, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        email: loginState?.email,
        password: loginState?.password,
        redirect: false,
      });
      console.log({ res });
      if (res.error) {
        setLoading(false);
        setApiResponse({ message: res.error, status: res.ok });
        return null;
      } else {
        setApiResponse({ message: "", status: res.ok });
      }
    } catch (error) {
      setLoading(false);
      console.error("something went wrong: ", error.message);
      return null;
    }
    router.push("/");
  };

  return (
    <form className="mt-8 px-4 sm:px-8 pb-5" onSubmit={handleSubmit}>
      <div className="-space-y-px space-y-6">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.name as keyof LoginState]}
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
      <FormAction
        apiResponse={apiResponse}
        handleSubmit={handleSubmit}
        text="Login"
        loading={loading}
      />
    </form>
  );
}

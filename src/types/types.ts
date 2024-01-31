
interface HeaderProps {
  heading: string;
  paragraph: string;
  linkName: string;
  linkUrl: string;
}

interface LoginFields {
  labelText: string;
  labelFor: string;
  id: string;
  name: string;
  type: string;
  autoComplete: string;
  isRequired: boolean;
  placeholder: string;
}

interface ApiResponse{
  message:string,
  status: boolean | string
}

interface FormActionsProps{
  apiResponse: ApiResponse
  handleSubmit:(e:React.FormEvent)=>void,
  loading: boolean, 
  buttonType:string,
  action:'submit',
  text:string
}


interface InputProps extends LoginFields {
  handleChange: (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  value: string;
  customClass: string;
}

interface UserSchema {
  username: string,
  email:string,
  password:string,
}

interface Credentials{
    email:string,
    password: string,
    redirect: string,
    csrfToken: string,
    callbackUrl: string,
    json: string
}
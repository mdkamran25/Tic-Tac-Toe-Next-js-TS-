
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

interface FormActionsProps{
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

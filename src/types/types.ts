
interface FormHeaderProps {
  heading: string;
  paragraph: string;
  linkActions: Array<{title:string; url:string}>
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
  text:string
}


interface InputProps extends LoginFields {
  handleChange: (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  value: string;
  customClass: string;
}

interface UserSchema {
  name: string,
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

interface UserResponseData {
  message: string;
  data: {
    _id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  status: boolean;
  existingUser: boolean;
}

interface PortalInterface {
  children: React.ReactNode;
  show?: boolean;
  selector: string;
};

interface DashboardHeader {
  headerMessage : string;
}

interface GameSchema {
  roomCode: string;
  board: string[];
  turn: string;
  winner: string | null;
  status: boolean;
  leftGame: {
    playerX: boolean;
    playerO: boolean;
  };
}

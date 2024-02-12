interface FormHeaderProps {
  heading: string;
  paragraph: string;
  linkActions: Array<{ title: string; url: string }>;
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

interface ApiResponse {
  message: string;
  status: boolean | string;
}

interface FormActionsProps {
  apiResponse: ApiResponse;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  buttonType: string;
  text: string;
}

interface InputProps extends LoginFields {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value: string;
  customClass: string;
}

interface UserSchema {
  name: string;
  email: string;
  password: string;
}

interface Credentials {
  email: string;
  password: string;
  redirect: string;
  csrfToken: string;
  callbackUrl: string;
  json: string;
}

interface UserData {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

interface UserResponseData {
  message: string;
  data: UserData
  status: boolean;
  existingUser: boolean;
}

interface PortalInterface {
  children: React.ReactNode;
  show?: boolean;
  selector: string;
}

interface DashboardHeader {
  headerMessage: string;
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

interface Game {
  roomCode: string;
  playerXId: UserData | string;
  turn: string;
  board: string[];
  winner: string;
  status: boolean;
  leftGame: {
    playerX: boolean;
    playerO: boolean;
  };
  playerOId?: UserData | string;
}

interface GameContextType {
  game: Game;
  setGame: (game: Game) => void;
}

interface JoinRoomApiParams {
  roomCode: string;
}

interface Session {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

interface SquaresProps {
  i: number;
  roomData: Game;
}

interface SquareProps {
  value: JSX.Element | null;
  i: number;
  session: Session | undefined;
  roomData: Game;
}

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}
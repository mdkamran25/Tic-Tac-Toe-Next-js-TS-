import ProfileModal from "@/components/profileModal/profileModal";
import { user } from "@/constants/apiUrl";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DashboardCard from "@/components/dashboardCard/card";
import Image from "next/image";
import win from "./../../assets/trophy.png";
import totalGame from "./../../assets/totalGame.png";
import lose from "./../../assets/lose.png";
import draw from "./../../assets/draw.png";
import StartGame from "@/components/startGame/startGame";

export default async function Dashboard() {
  const session: Session | null = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  const res = await fetch(`${user}/${session?.user?.email}`);
  const resData = await res.json() as UserResponseData;

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="w-screen px-3 md:px-8 mt-3 md:mt-5 flex flex-row">
        <div className="">
          <h1 className="text-2xl font-sans italic font-medium text-gradient-to-r from-cyan-500 to-blue-500">
            Welcome to online multiplayer Tic Tac Toe game
          </h1>
          <h2 className="w-fit text-gradient text-xl font-medium font-serif italic">
            {resData?.data?.name}
          </h2>
        </div>
        <div className="ms-auto">
          <ProfileModal />
        </div>
      </div>
      <div className="w-screen pt-5 grid grid-cols-2 place-items-center md:flex flex-row justify-center">
        <DashboardCard>
          <p className="text-xl font-sans font-medium pb-1">Total Played</p>
          <div className="flex flex-row gap-3">
            <Image src={totalGame} alt="Total Game Played Icon" width={30} />
            <p className="inline text-2xl font-sans font-medium">0</p>
          </div>
        </DashboardCard>
        <DashboardCard>
          <p className="text-xl font-sans font-medium pb-1">Total Win</p>
          <div className="flex flex-row gap-3">
            <Image src={win} alt="Total Game win Icon" width={30} />
            <p className="inline text-2xl font-sans font-medium">0</p>
          </div>
        </DashboardCard>
        <DashboardCard>
          <p className="text-xl font-sans font-medium pb-1">Total Lose</p>
          <div className="flex flex-row gap-3">
            <Image src={lose} alt="Total Game Lose Icon" width={30} />
            <p className="inline text-2xl font-sans font-medium">0</p>
          </div>
        </DashboardCard>
        <DashboardCard>
          <p className="text-xl font-sans font-medium pb-1">Total Draw</p>
          <div className="flex flex-row gap-3">
            <Image src={draw} alt="Total Game Lose Icon" width={30} />
            <p className="inline text-2xl font-sans font-medium">0</p>
          </div>
        </DashboardCard>
      </div>
      <div className="w-screen pt-10 flex flex-col gap-3 justify-center items-center">
        <StartGame />
      </div>
    </div>
  );
}

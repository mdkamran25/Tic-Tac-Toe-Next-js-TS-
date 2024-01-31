import Header from "@/components/header/header";
import Login from "@/components/login/login";
import { getServerSession } from "next-auth";

export default async function Dashboard() {
  const session = await getServerSession();
  console.log({session})
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome to dashboard</h1>
      {session && <>
        <h1 className="text-4xl font-bold">{session?.email}</h1>

      </>}
    </div>
  );
}

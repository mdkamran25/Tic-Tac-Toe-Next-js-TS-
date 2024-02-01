import ProfileModal from "@/components/profileModal/profileModal";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession();
  
    if(!session){
      redirect('/login')
    }

  console.log("session Dashboard:"  , session )
  
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="ms-auto">
        <ProfileModal />
      </div>

      <h1 className="text-4xl font-bold">Welcome to dashboard</h1>
      {session && (
        <>
          <h1 className="text-4xl font-bold">{session?.user?.email}</h1>
        </>
      )}
    </div>
  );
}

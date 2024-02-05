// WIP
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Room = async () => {
  const session: Session | null = await getServerSession();
  if (!session) {
    redirect("/");
  }
  return <div>
     {/* WIP */}
  </div>;
};

export default Room;

import React from "react";
import DashboardCard from "../dashboardCard/card";

const GameDetails = () => {
  return (
    <>
      <DashboardCard>
        <div className="">
          <p className="text-xl font-semibold font-sans">
            Oppoenent:{" "}
            <span className="text-xl font-medium font-sans">
              Not Joined Yet
            </span>{" "}
          </p>
          <p className="text-xl font-semibold font-sans">
            Your Symbol:{" "}
            <span className="text-purple-600 text-2xl font-bold">X</span>
          </p>
          <p className="text-xl font-semibold font-sans">
            Game Status:{" "}
            <span className="text-xl font-medium font-sans">Progress...</span>
          </p>
        </div>
      </DashboardCard>
    </>
  );
};

export default GameDetails;

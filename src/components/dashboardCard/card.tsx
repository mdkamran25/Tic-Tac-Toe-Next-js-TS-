import React, { PropsWithChildren } from "react";

const DashboardCard: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="shadow-dashboard-card-shadow rounded-dashboard-card bg-dashboard-card m-[10px]  w-[90%] h-[5rem] md:w-[10rem] md:h-[5rem] flex flex-col justify-center items-center">
      {children}
    </div>
  );
};

export default DashboardCard;

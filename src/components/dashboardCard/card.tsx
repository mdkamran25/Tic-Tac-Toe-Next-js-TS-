const DashboardCard = ({ children }: { children: React.ReactNode }) => {
    const cardStyle = {
        // width: "10rem",
        // height: "5rem",
        margin: "10px",
        border: "0px solid",
        borderRadius: "20px",
        background:"rgb(24,24,24)",
        boxShadow: "0px 0px 5px 1px rgb(211, 211, 211)", // Adjust the RGB values for the lighting color
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    };

    return <div style={cardStyle} className="grid w-[90%] h-[5rem] md:w-[10rem] md:h-[5rem] grid-cols-3 md:flex flex-col justify-center items-center">{children}</div>;
};

export default DashboardCard;

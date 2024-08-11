import Banner from "../components/home/Banner";
import { NavLink } from "react-router-dom";
import { Button } from "antd";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full h-[100vh]">
      <Banner />

      <NavLink to="/dashboard">
        <Button className="border shadow-md rounded-md mx-auto bg-[#f5f5f5] p-3 font-montserrat cursor-pointer h-9">
          Dashboard
        </Button>
      </NavLink>
    </div>
  );
};

export default Home;

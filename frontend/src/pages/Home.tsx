import Banner from "../components/home/Banner";
import { NavLink } from "react-router-dom";
import { useGetBannersQuery } from "../redux/api/bannerSlice";

const Home = () => {
  const { data: banners } = useGetBannersQuery({ page: 1, limit: 10 });

  if (!banners)
    return (
      <div className="w-2/3 border shadow-md rounded-md mx-auto bg-[#f5f5f5] hover:shadow-2xl p-3 font-montserrat">
        <h3 className="text-center">Hold on, we're fetching all the cards.. 😋</h3>
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full h-[100vh]">
      <Banner banners={banners?.data} />

      <NavLink to="/dashboard">
        <div className="border shadow-md hover:text-red-400 shadow-red-400 rounded-md mx-auto bg-[#f5f5f5] p-3 font-montserrat cursor-pointer h-9 flex items-center">
          Dashboard
        </div>
      </NavLink>
    </div>
  );
};

export default Home;

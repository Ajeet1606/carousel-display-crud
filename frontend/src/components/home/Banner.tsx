import { useEffect, useState } from "react";
import { useGetBannersQuery } from "../../redux/api/bannerSlice";
const Banner = () => {
  const { data: banners } = useGetBannersQuery({ page: 1, limit: 10 });

  const [count, setCount] = useState(banners?.data[0].timer || 0);
  const [currentBanner, setCurrentBanner] = useState(0);
  const noCardsToShow: boolean = banners?.data.some((card) => card.visible)
    ? false
    : true; // Check if any card is visible

  useEffect(() => {
    if (banners?.data == undefined || banners?.data.length == 0) return;
    if (count > 0) {
      const timerId = setTimeout(() => {
        setCount(count - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    } else {
      let next = (currentBanner + 1) % banners?.data.length;
      while (banners?.data[next].visible === false) {
        next = (next + 1) % banners.data.length;
      }
      setCurrentBanner(next);
      setCount(banners?.data[next].timer);
    }
  }, [count]);

  return (
    <>
      {noCardsToShow ? (
        <div className="w-2/3 border shadow-md rounded-md mx-auto bg-[#f5f5f5] hover:shadow-2xl p-3 font-montserrat">
          <h3>Oops, no more cards to show. 😥</h3>
        </div>
      ) : (
        <a
          href={banners?.data[currentBanner].link}
          target="_blank"
          className="w-2/3"
        >
          <div
            className="w-full border shadow-md rounded-md mx-auto bg-[#f5f5f5] hover:shadow-2xl p-3 font-montserrat"
            key={currentBanner}
          >
            <img
              src={banners?.data[currentBanner].image}
              alt=""
              className="w-[150px] h-[150px] rounded-md float-left mr-2 mb-2"
            />
            <div className="flex justify-between items-center">
              <h3 className="text-3xl font-bold">
                {banners?.data[currentBanner].name}
              </h3>
              <span className="text-xl inset-0 animate-slide-down" key={count}>
                {count}
              </span>
            </div>
            <p className="md:text-lg text-md text-base leading-relaxed">
              {banners?.data[currentBanner].about}
            </p>
          </div>
        </a>
      )}
    </>
  );
};

export default Banner;

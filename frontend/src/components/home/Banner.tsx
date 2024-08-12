import { useEffect, useState } from "react";
import { BannerType } from "./data";

interface props {
  banners: BannerType[];
}
const Banner: React.FC<props> = ({ banners }) => {
  const [count, setCount] = useState(banners[0].timer || 0);
  const [currentBanner, setCurrentBanner] = useState(0);
  const noCardsToShow: boolean = banners.some((card) => card.visible)
    ? false
    : true; // Check if any card is visible

  useEffect(() => {
    if (banners == undefined || banners.length == 0) return;
    if (count > 0) {
      const timerId = setTimeout(() => {
        setCount(count - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    } else {
      let next = (currentBanner + 1) % banners.length;
      while (banners[next].visible === false) {
        next = (next + 1) % banners.length;
      }
      setCurrentBanner(next);
      setCount(banners[next].timer);
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
          href={banners[currentBanner].link}
          target="_blank"
          className="w-[90%] md:w-2/3"
        >
          <div
            className="w-full border shadow-md shadow-red-400 rounded-md mx-auto bg-[#f5f5f5] p-3 font-montserrat"
            key={currentBanner}
          >
            <img
              src={banners[currentBanner].image}
              alt=""
              className="w-[150px] h-[150px] rounded-md float-left mr-2 mb-2"
            />
            <div className="flex justify-between items-center gap-2">
              <h3 className="text-3xl font-bold text-red-400">
                {banners[currentBanner].name}
              </h3>
              <span className="text-xl inset-0 animate-slide-down text-red-400" key={count}>
                {count}
              </span>
            </div>
            <p className="md:text-lg text-md text-base leading-relaxed">
              {banners[currentBanner].about}
            </p>
          </div>
        </a>
      )}
    </>
  );
};

export default Banner;

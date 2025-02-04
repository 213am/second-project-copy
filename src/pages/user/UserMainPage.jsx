import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import { useInView } from "react-intersection-observer";
import { LuArrowDownUp } from "react-icons/lu";
import MenuBar from "../../components/MenuBar";
import Notification from "../../components/Notification";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isWhiteIcon } from "../../atoms/noticeAtom";

const UserMainPage = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [pagenation, setPagenation] = useState(1);
  const [categoryId, setCategoryId] = useState(1);
  const navigate = useNavigate();
  const [isWhite, setIsWhite] = useRecoilState(isWhiteIcon);
  // 알림 아이콘 흰색

  useEffect(() => {
    setIsWhite(true);
  }, []);

  const { ref, inView } = useInView({
    threshold: 0.7, // 화면의 70%가 보일 때 감지
  });

  useEffect(() => {
    console.log("ref 연결 상태: ", ref.current);
  }, []);

  useEffect(() => {
    const getRestaurantList = async () => {
      const params = {
        categoryId: categoryId,
        page: pagenation,
        size: 20,
      };
      try {
        const res = await axios.get("/api/restaurant/main", { params });
        const result = res.data.resultData;

        const detailAddress = result.map(data => {
          return data.restaurantAddress.match(/대구광역시\s*(.+)/)[1];
        });
        console.log(detailAddress);
        setRestaurantList([...result]);
      } catch (error) {
        console.log(error);
      }
    };
    getRestaurantList();
  }, [categoryId]);

  useEffect(() => {
    console.log("inView 값 변경: ", inView);
    if (inView) {
      setPagenation(pagenation + 1);
      const getRestaurantList = async () => {
        const params = {
          categoryId: categoryId,
          page: pagenation,
          size: 20,
        };
        try {
          const res = await axios.get("/api/restaurant/main", { params });
          const result = res.data.resultData;

          const detailAddress = result.map(data => {
            return data.restaurantAddress.match(/대구광역시\s*(.+)/)[1];
          });
          console.log(detailAddress);
          setRestaurantList([...restaurantList, ...result]);
        } catch (error) {
          console.log(error);
        }
      };
      getRestaurantList();
    }
  }, [inView]);

  const detailNavigateHandler = e => {
    navigate(`/user/restaurant/detail/${e.restaurantId}`, {
      state: {
        restaurantId: e.restaurantId,
      },
    });
  };

  return (
    <div className="w-full h-dvh overflow-x-hidden overflow-y-scroll scrollbar-hide">
      <Notification />
      <div className="flex justify-center">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {/* Swiper 1 */}
          <SwiperSlide className="relative">
            <img src="/startingPage.png" alt="" />
            <div className="absolute left-2 bottom-8 font-bold">
              <p className="w-14 px-1 py-1 rounded-lg bg-primary text-white mb-2 text-center text-xs text-nowrap">
                추천식당
              </p>
              <div className="flex flex-col">
                <span className="pl-2 text-white text-2xl">
                  여기 진짜 맛있어요!
                </span>
                <span className="pl-2 text-white text-2xl">
                  호불호 없을 누구나 좋아하는 맛
                </span>
              </div>
            </div>
          </SwiperSlide>
          {/* Swiper 2 */}
          <SwiperSlide className="relative">
            <img src="/startingPage.png" alt="" />
            <div className="absolute left-2 bottom-8 font-bold">
              <p className="w-14 px-1 py-1 rounded-lg bg-primary text-white mb-2 text-center text-xs text-nowrap">
                추천식당
              </p>
              <div className="flex flex-col">
                <span className="pl-2 text-white text-2xl">
                  여기 진짜 맛있어요!
                </span>
                <span className="pl-2 text-white text-2xl">
                  호불호 없을 누구나 좋아하는 맛
                </span>
              </div>
            </div>
          </SwiperSlide>
          {/* Swiper 3 */}
          <SwiperSlide className="relative">
            <img src="/startingPage.png" alt="" />
            <div className="absolute left-2 bottom-8 font-bold">
              <p className="w-14 px-1 py-1 rounded-lg bg-primary text-white mb-2 text-center text-xs text-nowrap">
                추천식당
              </p>
              <div className="flex flex-col">
                <span className="pl-2 text-white text-2xl">
                  여기 진짜 맛있어요!
                </span>
                <span className="pl-2 text-white text-2xl">
                  호불호 없을 누구나 좋아하는 맛
                </span>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="pt-2 pb-24">
        <h1>{inView}</h1>
        <div className="w-100% flex pl-5 pt-2 justify-between">
          <div className="flex items-center gap-1">
            <LuArrowDownUp />
            <p className="text-sm">기본순</p>
          </div>
          <div className="flex gap-2 pr-5 text-sm">
            <p
              className={`text-white px-2 py-0.5 rounded-lg font-bold ${categoryId === 1 ? "bg-primary" : "bg-darkGray"}`}
              onClick={() => setCategoryId(1)}
            >
              한식
            </p>
            <p
              className={`text-white px-2 py-0.5 rounded-lg font-bold ${categoryId === 2 ? "bg-primary" : "bg-darkGray"}`}
              onClick={() => setCategoryId(2)}
            >
              중식
            </p>
            <p
              className={`text-white px-2 py-0.5 rounded-lg font-bold ${categoryId === 3 ? "bg-primary" : "bg-darkGray"}`}
              onClick={() => setCategoryId(3)}
            >
              일식
            </p>
          </div>
        </div>
        <div className="w-full px-4 py-4 flex flex-wrap justify-between">
          {restaurantList.map((data, index) => (
            <div
              className="w-[calc(50%_-_0.5rem)] pb-3"
              key={index}
              onClick={() => detailNavigateHandler(data)}
            >
              <div className="flex w-full">
                <img
                  src={`http://112.222.157.156:5222/pic/restaurant/${data.restaurantId}/${data.restaurantAroundPicList.filePath}`}
                  alt="메뉴사진"
                  className="w-full h-44"
                />
              </div>
              <div className="w-[100%] flex justify-between pt-1 gap-0.5">
                <div className="w-[70%]">
                  <p className="font-semibold truncate">
                    {data.restaurantName}
                  </p>
                  <p className="text-xs text-darkGray text-nowrap">
                    {data.restaurantAddress.match(/대구광역시\s*(.+)/)[1]}
                  </p>
                </div>
                <p className="w-[30%] font-bold text-base text-primary text-nowrap">
                  약 {data.avgRestaurant}분
                </p>
              </div>
            </div>
          ))}
          <div ref={ref}></div>
        </div>
      </div>
      <MenuBar />
    </div>
  );
};
export default UserMainPage;

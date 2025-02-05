import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoIosSearch, IoMdArrowBack } from "react-icons/io";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import { useNavigate } from "react-router-dom";

// ListDiv styled component 수정
const ListDiv = styled.div`
  position: absolute;
  width: 100%;
  height: ${props => `${props.height}px`};
  bottom: 0px;
  z-index: 1;
  background-color: #fff;
  border-radius: 5px 5px 0 0;
  padding-left: 20px;
  overflow-y: auto;
  transition: height 0.3s ease-in-out;
  z-index: 10;
`;

const BarDiv = styled.div`
  width: 100px;
  height: 5px;
  margin-top: 10px;
  background-color: #eee;
  border-radius: 2px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const SortDiv = styled.div`
  padding: 3px 10px;
  background-color: #ddd;
  color: #fff;
  display: inline-block;
  font-size: 10px;
  border-radius: 10px;
`;

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;
  margin-bottom: 5px;
`;

const SearchDiv = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  top: 2%;
  width: 100%;
  z-index: 10;
  color: #333;
  div {
    display: flex;
    gap: 10px;
    background-color: #fff;
    width: calc(100% - 40px);
    padding: 5px 10px;
    border-radius: 2px;
    box-shadow:
      0px 20px 25px -5px rgba(0, 0, 0, 0.1),
      0px 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  input {
    width: 100%;
  }
`;

const OverlayContainer = styled.div`
  position: relative;
  background-color: #fff; /* 배경을 흰색으로 설정 */
  padding: 10px;
  color: #333;
  font-size: 12px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  button {
    position: absolute;
    top: 5px;
    right: 5px;
    background: none;
    border: none;
    cursor: pointer;
  }
  h3 {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  p {
    font-size: 12px;
    color: #999;
  }
`;

const NowLocation = styled.div`
  background-color: #6f4cdb;
  color: #fff;
  border-radius: 5px;
  padding: 5px;
  font-size: 10px;
  position: absolute;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  left: 10px;
  bottom: -10px;
`;

function RestaurantPage() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);
  const [height, setHeight] = useState(250); // 초기 높이 250px
  const [restaurantList, setRestaurantList] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [isOpen, setIsOpen] = useState({});
  const [search, setSearch] = useState();
  const [sort, setSort] = useState(0);

  const navigate = useNavigate();

  const getRestaurantList = async () => {
    try {
      const res = await axios.get(
        `/api/restaurant/around?orderFilter=${sort}&userLat=${35.86}&userLng=${128.59}`,
      );

      console.log(res);
      const result = res.data.resultData;
      setRestaurantList([...result]);

      result.map(item => {
        setMarkers(prev => [
          ...prev,
          {
            title: item.restaurantName,
            address: item.restaurantAddress,
            position: { lat: item.lat, lng: item.lng },
          },
        ]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchRestaurant = async () => {
    setMarkers([]);
    try {
      const res = await axios.get(
        `/api/restaurant/around?searchFilter=${search}&userLat=${35.8682922103488}&userLng=${128.594024377585}`,
      );
      const result = res.data.resultData;
      setRestaurantList(result);
      result.map(item => {
        setMarkers(prev => [
          ...prev,
          {
            title: item.restaurantName,
            address: item.restaurantAddress,
            position: { lat: item.lat, lng: item.lng },
          },
        ]);
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRestaurantList();
  }, [sort]);

  useEffect(() => {
    const loadKakaoMap = () => {
      if (window.kakao?.maps) {
        setIsMapLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.async = true;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
        import.meta.env.VITE_KKO_MAP_KEY
      }&autoload=false&libraries=services`;

      script.addEventListener("load", () => {
        window.kakao.maps.load(() => setIsMapLoaded(true));
      });

      document.head.appendChild(script);
      return () => document.head.removeChild(script);
    };

    loadKakaoMap();
  }, []);

  // slideUpDown 함수 수정
  const slideUpDown = () => {
    setIsListOpen(prev => !prev);
    // isListOpen 상태에 따라 height 값 변경
    setHeight(prev => {
      // 높이가 250으로 변경될 때 스크롤을 상단으로 이동
      if (prev !== 250) {
        const scrollableDiv = document.querySelector(".scrollable-content");
        if (scrollableDiv) {
          scrollableDiv.scrollTop = 0;
        }
      }
      return prev === 250 ? window.innerHeight : 250;
    });
  };

  if (!isMapLoaded) {
    return <div>지도를 불러오는 중입니다...</div>;
  }
  return (
    <div className="w-full h-dvh overflow-hidden overflow-y-scroll scrollbar-hide relative">
      <Map
        center={{
          lat: 35.8682922103488,
          lng: 128.594024377585,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
        level={3}
      >
        <div style={{ position: "relative" }}>
          <MapMarker
            position={{ lat: 35.8682922103488, lng: 128.594024377585 }}
          />
          <CustomOverlayMap
            position={{ lat: 35.8682922103488, lng: 128.594024377585 }}
          >
            <NowLocation>내 위치</NowLocation>
          </CustomOverlayMap>
        </div>
        {markers.map((marker, index) => (
          <div key={index}>
            <MapMarker
              position={marker.position}
              image={{
                src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                size: {
                  width: 24,
                  height: 35,
                },
              }}
              clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
              onClick={() => setIsOpen(index)}
            />
            {isOpen === index && (
              <CustomOverlayMap position={marker.position}>
                <OverlayContainer>
                  <button onClick={() => setIsOpen(null)}>❌</button>

                  <h3>{marker.title}</h3>
                  <p>{marker.address}</p>
                </OverlayContainer>
              </CustomOverlayMap>
            )}
          </div>
        ))}
      </Map>

      <SearchDiv>
        <div>
          <IoMdArrowBack
            style={{ width: 24, height: 24, cursor: "pointer" }}
            onClick={() => navigate(-1)}
          />

          <input
            type="text"
            placeholder="검색어를 입력해 주세요"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <IoIosSearch
            style={{ width: 24, height: 24, cursor: "pointer" }}
            onClick={() => {
              getSearchRestaurant();
            }}
          />
        </div>
      </SearchDiv>

      <ListDiv className="scrollbar-hide" isOpen={isListOpen} height={height}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingRight: 20,
          }}
          onClick={slideUpDown}
        >
          <BarDiv />
        </div>
        <FlexDiv style={{ gap: 10, marginBottom: 10 }}>
          <SortDiv
            style={{ backgroundColor: sort === 0 && "#6f4cdb" }}
            onClick={() => setSort(0)}
          >
            전체
          </SortDiv>
          <SortDiv
            style={{ backgroundColor: sort !== 0 && "#6f4cdb" }}
            onClick={() => setSort(1)}
          >
            거리순
          </SortDiv>
        </FlexDiv>

        <div
          className="scrollable-content"
          style={{
            maxHeight: height === 250 ? 180 : 680,
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          {restaurantList.map(item => (
            <div
              key={item.restaurantId}
              onClick={() =>
                navigate(`/user/restaurant/detail/${item.restaurantId}`)
              }
            >
              <FlexDiv>
                <span>{item.restaurantName}</span>
                <span style={{ fontSize: 10 }}>
                  식사시간 : {item.avgRestaurant}분
                </span>
              </FlexDiv>

              <FlexDiv>
                <FaStar style={{ width: 10, height: 10, color: "E1FF00" }} />
                <span style={{ fontWeight: 700, fontSize: 8 }}>4.8</span>
                <span style={{ fontSize: 8, color: "#BABABA" }}>
                  {item.restaurantAddress.match(/대구광역시\s*(.+)/)?.[1]} ·
                  한식
                </span>
              </FlexDiv>

              <FlexDiv style={{ overflowX: "scroll", marginBottom: 20 }}>
                <img
                  src={`http://112.222.157.156:5222/pic/restaurant/${item.restaurantId}/${item.restaurantArroundPicList[0].filePath}`}
                  style={{
                    minWidth: 140,
                    width: 140,
                    height: 140,
                    objectFit: "cover",
                  }}
                />

                <img src="/storeimg.png" style={{ width: 140, height: 140 }} />
                <img src="/storeimg.png" style={{ width: 140, height: 140 }} />
              </FlexDiv>
            </div>
          ))}
        </div>
      </ListDiv>
    </div>
  );
}

export default RestaurantPage;

import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMdArrowBack, IoMdClose } from "react-icons/io";
import { LuMapPin } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { reserveState } from "../../atoms/restaurantAtom";

const BackDiv = styled.div`
  background-color: #fff;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  padding: 3px;
  cursor: pointer;
  position: absolute;
  top: 0;
  margin: 10px 20px;
  color: #333;
`;

const TitleDiv = styled.div`
  padding: 15px 25px;
  div {
    font-size: 10px;
    color: #bababa;
    margin-bottom: 5px;
  }
  span {
    color: #eee;
    padding: 0 5px;
  }
  h1 {
    margin-bottom: 5px;
  }
  h2 {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 10px;
  }
`;

const LineDiv = styled.div`
  width: 100%;
  height: 10px;
  background-color: #ddd;
`;

const ContentDiv = styled.div`
  height: calc(100% - 100px);
  overflow-y: auto;
  padding: 15px 25px;
  div {
    color: #707070;
  }
  span {
    word-wrap: break-word;
    font-size: 12px;
    font-weight: 700;
  }
  h1 {
    font-weight: 700;
    margin-bottom: 20px;
  }
`;

const MenuDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
  img {
    width: 75px;
    height: 75px;
    border-radius: 5px;
  }
`;

const FooterDiv = styled.div`
  display: flex;
  gap: 35px;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 100%;
  bottom: 0;
  position: absolute;
  background-color: #fff;
  box-shadow:
    rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  button {
    padding: 5px 40px;
    font-size: 14px;
    background-color: #6f4cdb;
    color: #fff;
    border-radius: 5px;
  }
`;

const CountDiv = styled.div`
  width: 20px;
  height: 20px;
  background-color: #ddd;
  color: #fff;
  border-radius: 50%;
  line-height: 20px;
  text-align: center;
  padding-right: 1px;
  font-size: 9px;
`;

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  margin-bottom: 10px;
  span {
    width: 40px;
    margin-right: 10px;
  }
  p {
    padding: 2px 5px;
    border-radius: 2px;
    background-color: #e7e1f9;
    color: #fff;
    font-size: 8px;
  }
`;

const ModalDiv = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  background-color: #fff;
  padding: 10px 0;
  border-radius: 5px 5px 0 0;
  box-shadow:
    rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  button {
    font-size: 10px;
    padding: 5px 100px;
    border-radius: 5px;
    background-color: #6f4cdb;
    color: #fff;
  }
`;

function StoreDetailPage() {
  const [formData, setFormData] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [isReserve, setIsReserve] = useRecoilState(reserveState);
  const [reserveInfo, setReserveInfo] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  const getDetailStore = async () => {
    try {
      const res = await axios.get(`/api/restaurant?restaurantId=${id}`);
      setFormData(res.data.resultData);
      console.log(res.data.resultData);
    } catch (error) {
      console.log(error);
    }
  };

  const cateName = () => {
    switch (formData.categoryId) {
      case 1:
        return "한식";
      case 2:
        return "중식";
      case 3:
        return "일식";
      default:
        return "잘못된 값";
    }
  };

  const userCount = [1, 2, 3, 4, 5, 6, 7, 8];
  const reserveTime = ["11:30", "12:00", "12:30", "1:00", "1:30"];

  useEffect(() => {
    getDetailStore();
    console.log(id);
  }, []);
  return (
    <div style={{ height: "100vh" }}>
      <img
        src={`http://112.222.157.156:5222/pic/restaurant/${formData.restaurantId}/${formData.restaurantPics?.filePath}`}
        alt="가게 이미지"
        style={{ width: "100%", height: 260, position: "relative" }}
      />
      <BackDiv>
        <IoMdArrowBack
          style={{ width: "100%", height: "100%" }}
          onClick={() => navigate(-1)}
        />
      </BackDiv>
      <TitleDiv>
        <div>
          {formData.restaurantAddress
            ?.match(/대구광역시\s*중구/)[0]
            .replace("광역시", "")}{" "}
          <span>I</span> {cateName()}
        </div>
        <h1>{formData.restaurantName}</h1>
        <div>{formData.restaurantDescription}</div>

        <h2>
          <LuMapPin />
          {formData.restaurantAddress}
        </h2>
        <h2 style={{ marginTop: 10 }}>
          <BsFillTelephoneFill />
          매장 연락처 : {formData.restaurantNumber}
        </h2>
      </TitleDiv>
      <LineDiv />
      <ContentDiv>
        <h1>메뉴</h1>
        {/* map 사용하기 */}
        <MenuDiv>
          <img src="/menu.png" alt="메뉴 이미지" />
          <div>
            <div>캐비어알밥</div>
            <span>7,000원</span>
          </div>
        </MenuDiv>
        <LineDiv
          style={{ height: 1, backgroundColor: "#eee", marginBottom: 10 }}
        />
        <MenuDiv>
          <img src="/menu.png" alt="메뉴 이미지" />
          <div>
            <div>캐비어알밥</div>
            <span>7,000원</span>
          </div>
        </MenuDiv>
        <LineDiv
          style={{ height: 1, backgroundColor: "#eee", marginBottom: 10 }}
        />
        <MenuDiv>
          <img src="/menu.png" alt="메뉴 이미지" />
          <div>
            <div>캐비어알밥</div>
            <span>7,000원</span>
          </div>
        </MenuDiv>
        <LineDiv
          style={{ height: 1, backgroundColor: "#eee", marginBottom: 10 }}
        />
        <MenuDiv>
          <img src="/menu.png" alt="메뉴 이미지" />
          <div>
            <div>캐비어알밥</div>
            <span>7,000원</span>
          </div>
        </MenuDiv>
        <LineDiv
          style={{ height: 1, backgroundColor: "#eee", marginBottom: 10 }}
        />
        <MenuDiv>
          <img src="/menu.png" alt="메뉴 이미지" />
          <div>
            <div>캐비어알밥</div>
            <span>7,000원</span>
          </div>
        </MenuDiv>
        <LineDiv
          style={{ height: 1, backgroundColor: "#eee", marginBottom: 10 }}
        />
        <MenuDiv>
          <img src="/menu.png" alt="메뉴 이미지" />
          <div>
            <div>캐비어알밥</div>
            <span>7,000원</span>
          </div>
        </MenuDiv>
        <LineDiv
          style={{ height: 1, backgroundColor: "#eee", marginBottom: 10 }}
        />
      </ContentDiv>
      {!isModal && (
        <FooterDiv>
          <button
            onClick={() => {
              setIsReserve(false);
              navigate(`/user/restaurant/detail/reserve/${id}`);
            }}
          >
            앉아서 주문
          </button>
          <button
            onClick={() => {
              setIsReserve(true);
              setIsModal(true);
            }}
          >
            예약하기
          </button>
        </FooterDiv>
      )}

      {isModal && (
        <ModalDiv>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: 10,
            }}
          >
            <IoMdClose
              onClick={() => {
                setIsModal(false);
                setReserveInfo({});
              }}
            />
          </div>
          <div
            style={{
              textAlign: "center",
              fontSize: 12,
              marginBottom: 10,
            }}
          >
            예약할 시간과 인원을 선택해주세요
          </div>
          <CenterDiv>
            <span>인원수</span>
            <div style={{ display: "flex", gap: 10 }}>
              {userCount.map((item, index) => (
                <CountDiv
                  key={index}
                  style={{
                    backgroundColor: item === reserveInfo.count && "#6F4CDB",
                  }}
                  onClick={() =>
                    setReserveInfo({ ...reserveInfo, count: item })
                  }
                >
                  {item}명
                </CountDiv>
              ))}
            </div>
          </CenterDiv>
          <CenterDiv>
            <span>시간 선택</span>
            <div style={{ display: "flex", gap: 5 }}>
              {reserveTime.map((item, index) => (
                <p
                  key={index}
                  style={{
                    backgroundColor: item === reserveInfo.time && "#6F4CDB",
                  }}
                  onClick={() => setReserveInfo({ ...reserveInfo, time: item })}
                >
                  {item === "11:30" ? "오전" : "오후"} {item}
                </p>
              ))}
            </div>
          </CenterDiv>
          <CenterDiv style={{ gap: 5, color: "#FF9500" }}>
            <BsFillTelephoneFill />
            <div>9명 이상은 가게에 직접 문의해주세요</div>
          </CenterDiv>
          <ButtonDiv>
            <button
              onClick={() => {
                if (reserveInfo.time && reserveInfo.count) {
                  navigate(`/user/restaurant/detail/reserve/${id}`, {
                    state: reserveInfo,
                  });
                } else {
                  alert("시간과 인원을 선택해주세요");
                }
              }}
            >
              확인
            </button>
          </ButtonDiv>
        </ModalDiv>
      )}
    </div>
  );
}
export default StoreDetailPage;

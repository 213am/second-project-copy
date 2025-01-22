import { IoMdArrowBack } from "react-icons/io";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginAtom } from "../../atoms/userAtom";
import styled from "@emotion/styled";

const LayoutDiv = styled.div`
  text-align: center;
`;

const HeaderDiv = styled.div`
  @media (max-width: 430px) {
    width: 100%;
    padding: 10px 15px;
  }
  @media (max-width: 1400px) and (min-width: 431px) {
    width: 100%;
    padding: 20px 30px;
  }
`;

const CloseDiv = styled.div`
  @media (max-width: 430px) {
    width: 25px;
    height: 25px;
  }
  @media (max-width: 1400px) and (min-width: 431px) {
    width: 40px;
    height: 40px;
  }
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  font-weight: 700;
  @media (max-width: 430px) {
    font-size: 20px;
    width: 100%;
    margin-top: 50px;
    margin-bottom: 50px;
  }
  @media (max-width: 1400px) and (min-width: 431px) {
    width: 100%;
    font-size: 34px;
  }
`;

const Input = styled.input`
  border-bottom: 1px solid #bababa;
  color: #bababa;
  @media (max-width: 430px) {
    max-width: 430px;
    width: 100%;
    padding: 10px 0;
    margin-top: 25px;
  }
  @media (max-width: 1400px) and (min-width: 431px) {
    width: 500px;
    font-size: 24px;
    margin-top: 40px;
    padding: 15px 0;
  }
`;

const LoginBtn = styled.button`
  color: #fff;
  border-radius: 5px;
  @media (max-width: 430px) {
    width: 100%;
    padding: 10px 0;
    margin-top: 25px;
  }
  @media (max-width: 1400px) and (min-width: 431px) {
    width: 500px;
    padding: 15px 0;
    font-size: 24px;
    margin-top: 40px;
  }
`;

const YupDiv = styled.div`
  color: #f00;
  text-align: left;
  @media (max-width: 430px) {
    margin-top: 5px;
    font-size: 11px;
  }
  @media (max-width: 1400px) and (min-width: 431px) {
    margin-top: 10px;
    font-size: 17px;
  }
`;

const FormDiv = styled.div`
  margin: 0 auto;
  @media (max-width: 430px) {
    width: 100%;
  }
  @media (max-width: 1400px) and (min-width: 431px) {
    max-width: 500px;
    width: 100%;
  }
`;

const InputYupDiv = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  @media (max-width: 430px) {
    height: 92px;
  }
  @media (max-width: 1400px) and (min-width: 431px) {
    height: 143px;
  }
`;

function EditPwPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(loginAtom);
  const [formData, setFormData] = useState({ uid: "", upw: "" });
  const [hasVal, setHasVal] = useState(false);

  const pathMove = () => {
    navigate("/auth");
  };

  const postLogin = async () => {
    try {
      await axios.post("/api/user/sign-in", formData);
      setIsLogin(true);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    postLogin();
  };

  useEffect(() => {
    if (formData.uid && formData.upw) {
      setHasVal(true);
    } else {
      setHasVal(false);
    }
  }, [formData]);

  return (
    <LayoutDiv>
      <HeaderDiv>
        <CloseDiv>
          <IoMdArrowBack
            style={{ width: "100%", height: "100%", cursor: "pointer" }}
            onClick={() => pathMove()}
          />
        </CloseDiv>
      </HeaderDiv>
      <FormDiv>
        <form onSubmit={e => handleSubmit(e)}>
          <TitleDiv>비밀번호 변경</TitleDiv>
          <InputYupDiv>
            <Input
              type="text"
              placeholder="새 비밀번호"
              onChange={e => setFormData({ ...formData, uid: e.target.value })}
            />

            <YupDiv>영문, 숫자, 특수문자가 조합 8-16자리로 입력해주세요</YupDiv>
          </InputYupDiv>
          <InputYupDiv>
            <Input
              type="password"
              placeholder="새 비밀번호 확인"
              onChange={e => setFormData({ ...formData, upw: e.target.value })}
            />
            <YupDiv>비밀번호를 재확인해주세요</YupDiv>
          </InputYupDiv>

          <div style={{ marginLeft: 20, marginRight: 20 }}>
            <LoginBtn
              type="submit"
              style={{
                backgroundColor: hasVal ? "#6F4CDB" : "#ddd",
              }}
              disabled={!hasVal}
            >
              확인
            </LoginBtn>
          </div>
        </form>
      </FormDiv>
    </LayoutDiv>
  );
}

export default EditPwPage;

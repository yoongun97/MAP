import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const StHeaderBtn = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  font-size: 15px;
  cursor: pointer;
`;

const StModal = styled.div`
  position: fixed;
  z-index: 200;
  top: 20%;
  left: 36%;
  width: 300px;
  background: white;
  color: black;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StModalTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StModalSubTitle = styled.p`
  margin-left: 30px;
  margin-right: auto;
`;

const StModalInput = styled.input`
  margin: 5px;
  width: 230px;
  height: 25px;
  margin-left: 30px;
  margin-right: auto;
  margin-bottom: 10px;
`;

const StModalBtns = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const StModalBtn = styled.button`
  width: 240px;
  height: 40px;
  margin-bottom: 10px;
  background-color: ${(props) => props.backgroundColor};
  border: none;
  cursor: pointer;
  color: white;
  font-size: 18px;
`;

function SignUp() {
  const [isModal1Open, setIsModal1Open] = useState(false);

  const openModal = () => {
    setIsModal1Open(true);
  };

  const closeModal = () => {
    setIsModal1Open(false);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      alert('가입되었습니다.');
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user); // 사용자 인증 정보가 변경될 때마다 해당 이벤트를 받아 처리합니다.
    });
  }, []);

  return (
    <>
      <StHeaderBtn onClick={openModal}>회원가입</StHeaderBtn>
      {isModal1Open && (
        <StModal>
          <StModalTitle>
            <h3 style={{ fontSize: '23px', fontWeight: 'bold', marginBottom: '10px' }}>SIGN UP</h3>
            <h4 style={{ fontSize: '13px', marginBottom: '20px' }}>지역기반 여행 가이드</h4>
          </StModalTitle>

          <StModalSubTitle>이메일</StModalSubTitle>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <StModalInput
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <button style={{ width: '40px', height: '30px', fontSize: '10px', marginBottom: '5px' }}>중복 확인</button>
          </div>

          <StModalSubTitle>닉네임</StModalSubTitle>
          <StModalInput />

          <StModalSubTitle>비밀번호</StModalSubTitle>
          <StModalInput
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <StModalSubTitle>비밀번호 확인</StModalSubTitle>
          <StModalInput style={{ marginBottom: '5px' }} />
          <p style={{ fontSize: '12px', marginLeft: '30px', marginRight: 'auto', color: 'red' }}>
            비밀번호가 일치하지 않습니다.
          </p>

          <StModalBtns>
            <StModalBtn backgroundColor="#474688" onClick={signUp}>
              회원가입
            </StModalBtn>
            <StModalBtn backgroundColor="#F55150" onClick={closeModal}>
              뒤로가기
            </StModalBtn>
          </StModalBtns>
        </StModal>
      )}
    </>
  );
}

export default SignUp;

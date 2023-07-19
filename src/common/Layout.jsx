import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import SignUp from '../components/signup/SignUp';
import LogIn from '../components/login/LogIn';

const StHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 24px;
  background-color: #2f2b6d;
  color: white;
`;

const StLogo = styled.div`
  cursor: pointer;
`;

const StFooter = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  padding: 24px;
  background-color: #eeeeee;
  color: black;
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
`;

function Layout() {
  const navigate = useNavigate();
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLogInOpen, setIsLogInOpen] = useState(false);

  // 모달 여닫기
  // 로그인, 회원가입 모달이 동시에 존재하지 않게
  const openSignUpModal = () => {
    setIsSignUpOpen(true);
    setIsLogInOpen(false);
  };

  const openLogInModal = () => {
    setIsLogInOpen(true);
    setIsSignUpOpen(false);
  };

  const closeModal = () => {
    setIsSignUpOpen(false);
    setIsLogInOpen(false);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
        paddingBottom: '90px',
        boxSizing: 'border-box'
      }}
    >
      <StHeader>
        <StLogo
          onClick={() => {
            navigate('/');
          }}
          style={{ cursor: 'pointer' }}
        >
          <span style={{ fontSize: '25px', marginRight: '10px' }}>MAP</span>
          <span style={{ fontSize: '13px' }}>Meet Awesome Place</span>
        </StLogo>
        <div
          style={{
            display: 'flex',
            gap: '12px'
          }}
        >
          <LogIn openModal={openLogInModal} closeModal={closeModal} isLogInOpen={isLogInOpen} />
          <SignUp openModal={openSignUpModal} closeModal={closeModal} isSignUpOpen={isSignUpOpen} />
        </div>
      </StHeader>
      <Outlet />

      {/* Route 안의 요소들을 보여줄 위치 */}
      <StFooter>
        <div>문의하기</div>
        <div>SNS 채널들</div>
      </StFooter>
    </div>
  );
}

export default Layout;

import React, { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import SignUp from '../components/signup/SignUp';
import LogIn from '../components/login/LogIn';

const StHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
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

const StContent = styled.div`
  ${({ $view }) => $view && 'filter: blur(5px);'}; // 모달이 열렸을 때 투명도와 backdrop 효과 적용
  margin-top: 73px;
`;

function Layout() {
  const navigate = useNavigate();
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLogInOpen, setIsLogInOpen] = useState(false);
  const [headerOpacity, setHeaderOpacity] = useState(1); // 헤더 투명도 상태 추가
  const scrollTimeoutRef = useRef(null); // 스크롤 타임아웃 참조 추가

  useEffect(() => {
    const handleScroll = () => {
      clearTimeout(scrollTimeoutRef.current);
      setHeaderOpacity(0.7); // 스크롤 중에는 투명도를 0.7로 설정
      scrollTimeoutRef.current = setTimeout(() => {
        setHeaderOpacity(1); // 스크롤이 멈추면 투명도를 1로 설정
      }, 50);
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트가 언마운트될 때 스크롤 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 모달 외부영역 참조
  const SignUpModalRef = useRef(null);
  const LogInModalRef = useRef(null);

  // 외부 영역 클릭 이벤트
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (SignUpModalRef.current && !SignUpModalRef.current.contains(event.target)) {
        setIsSignUpOpen(false);
      }
      if (LogInModalRef.current && !LogInModalRef.current.contains(event.target)) {
        setIsLogInOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
      <StHeader style={{ opacity: headerOpacity }}>
        <StLogo
          onClick={() => {
            navigate('/list');
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
          <LogIn
            openModal={openLogInModal}
            closeModal={closeModal}
            isLogInOpen={isLogInOpen}
            LogInModalRef={LogInModalRef}
          />
          <SignUp
            openModal={openSignUpModal}
            closeModal={closeModal}
            isSignUpOpen={isSignUpOpen}
            SignUpModalRef={SignUpModalRef}
          />
        </div>
      </StHeader>
      <StContent $view={isSignUpOpen || isLogInOpen}>
        <Outlet />
      </StContent>
      <StFooter>
        <div>문의하기</div>
        <div>SNS 채널들</div>
      </StFooter>
    </div>
  );
}

export default Layout;

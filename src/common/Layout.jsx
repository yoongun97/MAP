import React from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import SignUp from '../components/SignUp';
import LogIn from '../components/LogIn';

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
          <SignUp />
          <LogIn />
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

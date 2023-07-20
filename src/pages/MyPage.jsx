import React from 'react';
import { styled } from 'styled-components';

const StMyTitle = styled.h2`
  font-size: 30px;
  margin: 50px;
`;

function MyPage() {
  return (
    <>
      <StMyTitle>나의 여행지 List</StMyTitle>
    </>
  );
}

export default MyPage;

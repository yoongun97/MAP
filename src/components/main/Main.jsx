import React from 'react';
import * as S from './StyledMain';
import video from '../../assets/video/seoul.mp4';
const Main = () => {
  return (
    <S.mainContainer>
      <S.mainLeftContainer>
        <S.mainTextDiv>
          <S.mainSubtitleDiv>지역 기반 여행 가이드</S.mainSubtitleDiv>
          <S.mainTitleDiv>MAP</S.mainTitleDiv>
          <S.mainStartButton>시작하기</S.mainStartButton>
        </S.mainTextDiv>
      </S.mainLeftContainer>
      <S.mainRightContainer>
        <S.mainVideo autoPlay loop muted>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </S.mainVideo>
      </S.mainRightContainer>
    </S.mainContainer>
  );
};

export default Main;

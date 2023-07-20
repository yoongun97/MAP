import React from 'react';
import * as S from './StyledMain';
import video from '../../assets/video/seoul.mp4';
import { Link } from 'react-router-dom';
const Main = () => {
  return (
    <S.mainContainer>
      <S.mainLeftContainer>
        <S.mainTextDiv>
          <S.mainNav>
            <S.mainNavTitle>MAP</S.mainNavTitle>
            <S.mainNavSubtitle>Meet Awsome Place</S.mainNavSubtitle>
          </S.mainNav>
          <S.mainSubtitleDiv>지역 기반 여행 가이드</S.mainSubtitleDiv>
          <S.mainTitleDiv>MAP</S.mainTitleDiv>
          <Link to="/list">
            <S.mainStartButton>시작하기</S.mainStartButton>
          </Link>
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

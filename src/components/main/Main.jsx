import React, { useEffect } from 'react';
import * as S from './StyledMain';
import video from '../../assets/video/mainVideo.mp4';
import { Link } from 'react-router-dom';
const Main = () => {
  useEffect(() => {
    // 스크롤 막기
    document.body.style.overflow = 'hidden'; // 스크롤바를 없앰
    document.addEventListener('touchmove', disableScroll, { passive: false }); // 모바일 터치 스크롤 막기

    return () => {
      // 컴포넌트가 언마운트될 때 스크롤 막기 해제
      document.body.style.overflow = 'auto'; // 스크롤바를 보이게 함
      document.removeEventListener('touchmove', disableScroll); // 모바일 터치 스크롤 막기 해제
    };
  }, []);

  const disableScroll = (e) => {
    e.preventDefault();
  };

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
      <S.mainVideo autoPlay loop muted>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </S.mainVideo>
    </S.mainContainer>
  );
};

export default Main;

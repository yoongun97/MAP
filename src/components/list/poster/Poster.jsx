import React from 'react';
import posterImg from '../../../assets/posterImg.png';
import { P } from './StyledPoster';

const Poster = () => {
  return (
    <P.PosterContainer>
      <div></div>
      <img src={posterImg} alt="이미지" />
      <h2>"꿈꾸던 휴양지를 찾아보세요"</h2>
    </P.PosterContainer>
  );
};

export default Poster;

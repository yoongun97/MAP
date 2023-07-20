import { styled } from 'styled-components';
import backImg from '../../assets/korea.jpg';
export const mainContainer = styled.div`
  display: flex;
  height: 100vh;
  @media (max-width: 800px) {
    flex-direction: column;
  }
  overflow: hidden;
`;

export const mainLeftContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;
  /* border: 1px solid black; */

  @media (max-width: 800px) {
    width: 100vh;
  }
`;

export const mainTextDiv = styled.div`
  display: block;
`;

export const mainSubtitleDiv = styled.div`
  font-size: 1.5rem;
  text-align: center;
  @media (max-width: 1600px) {
    font-size: 1rem;
  }
`;

export const mainTitleDiv = styled.div`
  font-size: 7rem;
  text-align: center;

  @media (max-width: 1200px) {
    font-size: 5rem;
  }
`;

export const mainStartButton = styled.button`
  /* padding: 10px; */
  margin: 40px 5px 0px 5px;
  width: 230px;
  height: 50px;
  @media (max-width: 1200px) {
    width: 160px;
  }
`;

export const mainRightContainer = styled.div`
  width: 65%;
  height: 100%;
  background-image: url(${backImg});
  background-size: cover;
  background-position: center;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const mainVideo = styled.video`
  /* width: 100%; */
  height: 100%;
`;

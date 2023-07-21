import { styled } from 'styled-components';
// import backImg from '../../assets/korea.jpg';

const breakpoint800 = '800px';
const breakpoint1200 = '1200px';

export const mainContainer = styled.div`
  display: flex;
  height: 100%;
`;

export const mainLeftContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;

  position: absolute;
  @media (max-width: ${breakpoint800}) {
    justify-content: center; /* 가로 정렬 */
    align-items: center; /* 세로 정렬 */
    width: 100%;
  }
`;

export const mainTextDiv = styled.div`
  display: block;
`;

export const mainSubtitleDiv = styled.div`
  font-size: 1.5rem;
  text-align: center;
  color: white;

  @media (max-width: ${breakpoint1200}) {
    font-size: 1rem;
  }
  @media (max-width: ${breakpoint800}) {
    margin: auto;
  }
`;

export const mainTitleDiv = styled.div`
  font-size: 7rem;
  text-align: center;
  color: white;

  @media (max-width: ${breakpoint1200}) {
    font-size: 5rem;
  }

  @media (max-width: ${breakpoint800}) {
    margin: auto;
  }
`;

export const mainStartButton = styled.button`
  background-color: #474688;
  color: white;
  border: none;
  cursor: pointer;
  margin: 40px 5px 0px 5px;
  width: 230px;
  height: 50px;
  @media (max-width: ${breakpoint1200}) {
    width: 160px;
  }

  @media (max-width: ${breakpoint800}) {
    margin: auto;
  }
`;

export const mainVideo = styled.video`
  height: 100%;
`;

export const mainNav = styled.div`
  display: flex;
  position: absolute;
  top: 10px; /* 브라우저 상단과의 간격 조정 */
  left: 5%;
  /* transform: translateX(-50%); 수평 가운데 정렬 */
`;

export const mainNavTitle = styled.div`
  font-size: 3rem;
  top: 10px;
  @media (max-width: ${breakpoint1200}) {
    font-size: 2rem;
  }

  @media (max-width: ${breakpoint800}) {
    font-size: 2rem;
  }
`;

export const mainNavSubtitle = styled.div`
  display: flex;
  align-items: flex-end;
  color: grey;
`;

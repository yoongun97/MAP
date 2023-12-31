import { styled } from 'styled-components';

export const detailContainer = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;
  height: 60vh;
  justify-content: space-between;
  position: relative;
  /* margin-top: 100px; */
`;

export const detailKakaoMap = styled.div`
  width: 70%;
  height: ${({ $view }) => ($view ? '22vh' : '70vh')};
  /* transition: height 0.5s; */
`;

export const detailPlaceList = styled.div`
  border-radius: 10px;
  background: rgba(31, 38, 135, 0.02);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  .rec-div {
    margin: auto 0;
    font-size: 1.8vh;
    font-weight: bold;
  }
`;

export const spotList = styled.ul`
  height: 55vh;
  margin-bottom: 10px;
  overflow: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #2f3542;
    border-radius: 10px;
  }
  .ob-div {
    height: 5px;
  }
`;

export const StTitle = styled.p`
  font-size: 1.4vh;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 5px;
`;

export const StDesc = styled.p`
  font-size: 1.2vh;
  opacity: 0.8;
  color: gray;
  font-weight: bold;
`;

export const spotCard = styled.li`
  box-shadow: 0 2px 10px rgba(0, 100, 255, 0.2);
  background: white;
  border-radius: 4px;
  margin: 16px 8px !important;
  display: flex;
  position: relative;
  cursor: pointer;
  height: 4.5vw;
  min-height: 50px;
  gap: 10px;
  /* width: 50vh; */
  .placeAddBtn {
    background-color: transparent;
    height: 30px;
    width: 30px;
    border: rgba(0, 100, 255, 0.2) solid 1px;
    border-radius: 7px;
    margin: auto 5px auto auto;
    float: right;
    &:hover {
      background-color: rgba(0, 100, 255, 0.2);
      cursor: pointer;
    }
  }
`;

export const spotImage = styled.div`
  backdrop-filter: blur(4px);
  img {
    min-width: 50px;
    width: 4.5vw;
    aspect-ratio: 1;
  }
`;

export const rightBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  height: 700px;
`;

export const toggleBtn = styled.button`
  height: 60px;
  margin: 5px;
  margin-top: 20px;
  background-color: white;
  border: 1px solid rgba(0, 100, 255, 0.2);
  border-radius: 7px;
  box-shadow: 0 3px 10px rgba(0, 100, 255, 0.2);
  &:hover {
    background-color: rgba(0, 100, 255, 0.2);
    cursor: pointer;
  }
`;

export const planningBox = styled.div`
  .planning-box {
    display: ${(props) => {
      return props.$view ? 'block' : 'none';
    }}; /* 초기에 댓글창 숨김 */
    position: fixed;
    bottom: 0;
    width: 72%;
    height: 70vh;
    left: 0;
    background-color: white;
    padding: 0 20px;
    box-sizing: border-box;
    box-shadow: 0 3px 10px rgba(0, 100, 255, 0.2);
    z-index: 9;
  }
  .planning-box.slide-in {
    animation: slideIn 0.5s forwards;
  }
  .planning-box.slide-out {
    animation: slideOut 0.5s forwards;
  }
  @keyframes slideIn {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0%);
      opacity: 1;
    }
  }
  @keyframes slideOut {
    from {
      transform: translateY(0%);
      opacity: 1;
    }
    to {
      transform: translateY(100%);
      opacity: 0;
    }
  }
  .icon-box {
    width: 100%;
    height: 30px;
    margin-top: 0;
    border-bottom: 1.5px solid rgba(0, 100, 255, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .drop-down-icon {
    margin-left: 5px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 7px solid black;
    pointer-events: none;
  }
`;

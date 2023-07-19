import { styled } from 'styled-components';

export const detailContainer = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;
  justify-content: center;
`;
export const detailBox = styled.div`
  border: 1px solid black;
  width: 20%;
`;

export const detailKakaoMap = styled.div`
  width: 40%;
  height: 500px;
`;

export const detailPlaceList = styled.div`
  border: 1px solid black;
  width: 25%;
`;

export const spotList = styled.ul``;

export const spotCard = styled.li`
  /* box-shadow: rgba(31, 38, 135, 0.1) 0px 8px 32px 0px; */
  backdrop-filter: blur(4px);
  background: rgba(31, 38, 135, 0.1);
  border-radius: 4px;
  margin: 16px 8px !important;
  display: flex;
  position: relative;
  cursor: pointer;
  height: 80px;
  gap: 10px;
`;

export const spotImage = styled.div`
  img {
    width: 100px;
    height: 80px;
  }
`;

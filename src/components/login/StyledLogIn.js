import { styled } from 'styled-components';

export const StHeaderBtn = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  font-size: 15px;
  cursor: pointer;
`;

export const StModal = styled.div`
  position: fixed;
  z-index: 200;
  top: 20%;
  left: 36%;
  width: 300px;
  background: white;
  color: black;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StModalTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StModalSubTitle = styled.p`
  margin-left: 30px;
  margin-right: auto;
`;

export const StModalInput = styled.input`
  margin: 5px;
  width: 230px;
  height: 25px;
  margin-left: 30px;
  margin-right: auto;
  margin-bottom: 20px;
`;

export const StModalBtns = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const StModalBtn = styled.button`
  width: 240px;
  height: 40px;
  margin-bottom: 10px;
  background-color: ${(props) => props.backgroundColor};
  border: none;
  cursor: pointer;
  color: white;
  font-size: 18px;
`;

export const StSNSContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StSNSBtns = styled.div`
  display: flex;
`;

export const StSNSBtn = styled.img`
  background-color: transparent;
  width: 40px;
  height: 40px;
  margin-left: 15px;
  margin-right: 15px;
  cursor: pointer;
`;

export const StModalTitleL = styled.h3`
  font-size: 23px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const StModalTitleS = styled.h4`
  font-size: 13px;
  margin-bottom: 20px;
`;

export const StWarnMent = styled.p`
  font-size: 12px;
  margin-left: 30px;
  margin-right: auto;
  color: red;
`;

export const StSNSTitle = styled.p`
  font-weight: bold
  margin: 10px;
`;

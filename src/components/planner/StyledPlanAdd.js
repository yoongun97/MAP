import { styled } from 'styled-components';

export const planHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-left: 25px;
  margin-right: 10px;
`;

export const planTitle = styled.input`
  height: 30px;
  width: 70%;
  border: rgba(0, 100, 255, 0.2) solid 2px;
`;

export const planAddBtn = styled.button`
  width: 100px;
  height: 40px;
  background-color: white;
  border: 1px solid rgba(255, 100, 0, 0.2);
  border-radius: 7px;
  box-shadow: 0 4px 15px -3px rgba(255, 100, 0, 0.2);
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 100, 255, 0.2);
  }
`;

export const planContainer = styled.div`
  display: flex;
  margin-left: 25px;
  margin-top: 10px;
  border: none;
`;

export const timeBtnBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 15%;
  height: 65vh;
  .timeBtn {
    height: 13%;
    background-color: transparent;
    border: rgba(0, 100, 255, 0.2) solid 1px;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 100, 255, 0.2);
    }
  }
  .timeBtn.active {
    background-color: rgba(0, 100, 255, 0.2);
    border: rgba(0, 100, 255, 0.2) solid 2px;
  }
`;

export const planContentBox = styled.div`
  border: rgba(0, 100, 255, 0.2) solid 1px;
  width: 55vw;
  height: 60vh;
  margin-right: 10px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none !important;
  }

  .planCard {
    display: flex;
    .cardDeleteBtn {
      background-color: transparent;
      height: 50px;
      width: 50px;
      border: rgba(0, 100, 255, 0.2) solid 1px;
      border-radius: 7px;
      margin: auto;
      float: right;
      overflow: hidden;

      &:hover {
        opacity: 0.5;
        cursor: pointer;
      }
      .deleteImage {
        height: 30px;
        width: 30px;
      }
    }
  }
`;

export const planPlaceCard = styled.div`
  margin: 20px;
  width: 80%;
  border: rgba(0, 100, 255, 0.2) solid 1px;

  .contentBox {
    display: flex;
    border: rgba(0, 100, 255, 0.2) solid 1px;

    .fit-picture {
      height: 120px;
      width: 40%;
      max-width: 200px;
    }
  }

  .discBox {
    padding: 10px;
  }

  .planInput {
    height: 30px;
    width: 90%;
    margin-top: 10px;
    border: rgba(0, 100, 255, 0.2) solid 1px;
  }
`;

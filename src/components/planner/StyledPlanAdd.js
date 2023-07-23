import { styled } from 'styled-components';

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
  margin-right: 10px;

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

export const planAddBtn = styled.button`
  width: 100px;
  background-color: white;
  border: 1px solid rgba(0, 100, 255, 0.2);
  border-radius: 7px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 100, 255, 0.2);
  }
`;

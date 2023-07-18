import { styled } from 'styled-components';

export const L = {
  Wrap: styled.div`
    display: flex;
    .card-container {
      width: 200px;
      height: 300px;
      border: 1px solid gray;
      display: flex;
      flex-direction: column;
      margin: 20px;
      img {
        width: 100%;
        height: 79%;
        border: 1px solid blue;
      }
      .info-box {
        height: 19%;
        display: flex;
        justify-content: space-between;
        span {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 70%;
          p {
            margin-top: 2px;
            font-size: 0.8em;
          }
        }
        .like-box {
          display: flex;
          flex-direction: column;
          svg {
            margin: 10px;
            cursor: pointer;
          }
          p {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.8em;
          }
        }
      }
    }
  `
};

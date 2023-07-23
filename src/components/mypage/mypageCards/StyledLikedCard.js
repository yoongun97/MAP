import { styled } from 'styled-components';

export const L = {
  Wrap: styled.div`
    width: 80%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(190px, 25%));
    grid-gap: 40px 0;
    align-items: center;
    justify-content: center;
    .card-container {
      width: 80%;
      aspect-ratio: 7/10;
      border-radius: 2px;
      box-shadow: 0 2.5px 2px 0 gray;
      display: flex;
      margin: 15px auto;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      .img-div {
        overflow: hidden;
        width: 100%;
        height: 80%;
      }
      img {
        width: 100%;
        height: 100%;
        transition: transform 0.3s ease;
        &:hover {
          transform: scale(1.2);
        }
      }
      .info-box {
        height: 20%;
        display: flex;
        justify-content: space-between;
        box-shadow: 0 4px 30px 0px rgba(0, 100, 255, 0.2);
        padding: 0 10px;
        span {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 70%;
          font-size: 1.8vh;
          p {
            margin-top: 10px;
            font-size: 0.8em;
          }
        }
        .like-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          svg {
            margin: 5px;
            transition: transform 0.3s ease;
            &:hover {
              transform: scale(1.1);
            }
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

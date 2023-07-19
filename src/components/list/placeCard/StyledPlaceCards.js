import { styled } from 'styled-components';

export const L = {
  Wrap: styled.div`
    width: 80%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 40px 20px;
    align-items: center;
    .card-container {
      width: 74%;
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
        box-shadow: 0 4px 30px rgba(0, 100, 255, 0.2);
        padding: 0 10px;
        span {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 70%;
          p {
            margin-top: 10px;
            font-size: 0.8em;
          }
        }
        .like-box {
          display: flex;
          flex-direction: column;
          svg {
            margin: 10px;
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

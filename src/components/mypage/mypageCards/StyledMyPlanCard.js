import { styled } from 'styled-components';

export const MPC = {
  Wrap: styled.div`
    ${({ $view }) => $view && 'filter: blur(5px);'};
    width: 80%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(190px, 25%));
    grid-gap: 40px 0;
    align-items: center;
    justify-content: center;
    .plancard-container {
      position: relative;
      width: 80%;
      aspect-ratio: 7/10;
      border-radius: 2px;
      box-shadow: 0 2.5px 2px 0 gray;
      display: flex;
      margin: 15px auto;
      flex-direction: column;
      justify-content: space-between;
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
        box-shadow: 0 4px 20px -5px rgba(255, 100, 0, 0.2);
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
        .view-plan-btn {
          width: 40%;
          background-color: transparent;
          border: 1px solid rgba(255, 100, 0, 0.2);
          border-radius: 5px;
          margin: 5% 0;
          font-size: 100%;
          cursor: pointer;
        }
        .plan-delete-btn {
          position: absolute;
          top: -5px;
          right: -5px;
          width: 10%;
          aspect-ratio: 1;
          background-color: white;
          border: 1px solid rgba(255, 100, 0, 0.2);
          box-shadow: 0 4px 20px rgba(255, 100, 0, 0.2);
          border-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: rgba(255, 100, 0, 1);
          font-weight: bold;
          font-size: 15px;
          cursor: pointer;
          &:hover {
            transform: scale(1.2);
          }
        }
      }
    }
  `
};

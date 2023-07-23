import { styled } from 'styled-components';

export const P = {
  PosterContainer: styled.div`
    position: relative;
    height: 30vh;
    div {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      pointer-events: none;
    }
    img {
      width: 100%;
      height: 100%;
    }
    h2 {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 50px;
      font-weight: bold;
      color: white;
      z-index: 1;
    }
  `
};

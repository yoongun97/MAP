import { styled } from 'styled-components';

export const PV = {
  Wrap: styled.div`
    .modal {
      display: flex;
      flex-direction: column;
      width: 88%;
      height: 78%;
      background-color: white;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 9;
      box-shadow: 0 4px 20px rgba(255, 100, 0, 0.2);
      padding: 20px;

      .title {
        font-size: 27px;
        margin-left: 40px;
        margin-top: 10px;
        color: rgba(455, 100, 0, 0.2);
      }
      .contentContainer {
        display: flex;
        width: 90%;
        height: 80%;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 20px;
        margin: 0;
      }

      .time-btn-box {
        display: flex;
        flex-direction: column;
        width: 15%;
        height: 75vh;
        .timeBtn {
          height: 13%;
          background-color: transparent;
          border: rgba(255, 100, 0, 0.2) solid 1px;
          cursor: pointer;
          &:hover {
            background-color: rgba(255, 100, 0, 0.2);
          }
        }
        .timeBtn.active {
          background-color: rgba(255, 100, 0, 0.2);
          border: rgba(255, 100, 0, 0.2) solid 2px;
        }
        .close-modal {
          position: absolute;
          bottom: 20px;
          width: 14%;
          height: 5%;
          background-color: transparent;
          border: rgba(255, 100, 0, 0.2) solid 1px;
          box-shadow: 0 4px 20px -3px rgba(255, 100, 0, 0.2);
          cursor: pointer;
          &:hover {
            background-color: rgba(255, 100, 0, 0.2);
          }
        }
      }

      .plan-content-box {
        border: rgba(255, 100, 0, 0.2) solid 1px;
        width: 85%;
        .plan-card {
          display: flex;
          .plan-place-card {
            margin: 20px auto;
            width: 95%;
            border: rgba(255, 100, 0, 0.2) solid 1px;
            .content-box {
              display: flex;
              border: rgba(255, 100, 0, 0.2) solid 1px;
              .fit-picture {
                height: 120px;
                width: 40%;
                max-width: 200px;
              }
            }
            .disc-box {
              padding: 10px;
            }

            .plan-content {
              height: 30px;
              width: 90%;
              margin-top: 10px;
              border: rgba(255, 100, 0, 0.2) solid 1px;
            }
          }
        }
      }
    }
  `
};

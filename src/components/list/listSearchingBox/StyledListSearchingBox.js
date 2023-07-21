import { styled } from 'styled-components';

export const LSB = {
  SearchContainer: styled.div`
    width: 80%;
    margin: 40px auto 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .search-box {
      display: flex;
      align-items: center;
      position: relative;
      width: 400px;
      height: 60px;
      margin: 5px 20px;
      box-shadow: 0 0 3px 0 gray;
      span {
        width: 20px;
        margin: 10px;
        opacity: 0.6;
      }

      input {
        width: 100%;
        height: 85%;
        font-size: 22px;
        margin-right: 10px;
        border: none;
        outline: none;
      }
    }

    .filter-sort-btn-container {
      width: 90%;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      button {
        position: relative;
        background-color: transparent;
        border: none;
        cursor: pointer;
        box-shadow: 0 0 3px gray;
      }

      .current-sort-btn-box {
        display: flex;
        align-items: center;
        pointer-events: none;
      }

      .drop-down-icon {
        margin-left: 5px;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 7px solid black;
        pointer-events: none;
      }

      .dropdown {
        position: absolute;
        display: ${({ $view }) => ($view === 'true' ? 'block' : 'none')};
        width: 150px;
        padding: 10px;
        margin: 140px 0 0 0;
        background-color: white;
        box-shadow: 0 -0.5px 3px 0 gray;
        z-index: 1;
        ul {
          line-height: 1.8;

          li {
            font-size: 0.9em;
            opacity: 0.7;

            &:hover {
              opacity: 1;
            }
          }
        }
      }
    }
  `
};

import React, { useEffect, useRef, useState } from 'react';
import { LSB } from './StyledListSearchingBox';
import { useDispatch } from 'react-redux';
import { sortPlaces } from '../../../redux/module/places';

const ListSearchingBox = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [isShow, setIsShow] = useState(false);
  const sortingValues = ['좋아요순', '오름차순', '내림차순'];
  const [sortingValue, setSortingValue] = useState(sortingValues[0]);

  useEffect(() => {
    dispatch(sortPlaces(sortingValue));
  }, [sortingValue]);
  window.addEventListener('click', (e) => {
    if (!(e.target.getAttribute('class') === 'sort-btn')) {
      setIsShow(false);
    }
  });

  return (
    <LSB.SearchContainer $view={isShow.toString()}>
      <div
        className="search-box"
        onClick={() => {
          inputRef.current.focus();
        }}
      >
        <span>
          <svg width={'20'} height={'20'} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <circle fill="none" stroke="#000" strokeWidth={1.1} cx={'9'} cy={'9'} r={'7'}></circle>
            <path fill="none" stroke="#000" strokeWidth={'1.1'} d="M14,14 L18,18 L14,14 Z"></path>
          </svg>
        </span>
        <input type="text" ref={inputRef} placeholder="여행지(지역)를 검색하세요." />
      </div>
      <div className="filter-sort-btn-container">
        <button
          className="sort-btn"
          onClick={() => {
            setIsShow(!isShow);
          }}
        >
          <div className="current-sort-btn-box">
            {sortingValue}
            <span className="drop-down-icon"></span>
          </div>
        </button>
        <div className="dropdown">
          <ul>
            {sortingValues.map((sortingVal, idx) => {
              return (
                <li
                  key={idx}
                  onClick={() => {
                    setSortingValue(sortingVal);
                    setIsShow(!isShow);
                  }}
                >
                  {sortingVal}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </LSB.SearchContainer>
  );
};

export default ListSearchingBox;

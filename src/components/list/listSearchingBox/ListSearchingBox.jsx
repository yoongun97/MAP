import React, { useEffect, useState } from 'react';
import { LSB } from './StyledListSearchingBox';
import { useDispatch } from 'react-redux';
import { sortPlaces } from '../../../redux/module/places';

const ListSearchingBox = () => {
  const dispatch = useDispatch();
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
    <LSB.SearchContainer view={isShow.toString()}>
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

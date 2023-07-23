import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { getPlaceData } from '../api/places';
import { setPlaces } from '../redux/modules/places';
import LikedCard from '../components/mypage/mypageCards/LikedCard';
import MyPlanCard from '../components/mypage/mypageCards/MyPlanCard';

function MyPage() {
  const dispatch = useDispatch();
  const { isLoading, data } = useQuery('placeData', getPlaceData);
  const [isWhat, setIsWhat] = useState('like');
  useEffect(() => {
    dispatch(setPlaces(data));
  }, [data]);

  return (
    <>
      <StTitles>
        <StMyTitle
          className={`${isWhat === 'like' ? 'active-like' : ''}`}
          onClick={() => {
            setIsWhat('like');
          }}
        >
          나의 좋아요 <StLikeP>LIST</StLikeP>
        </StMyTitle>
        <StMyTitle
          className={`${isWhat === 'myplan' ? 'active-plan' : ''}`}
          onClick={() => {
            setIsWhat('myplan');
          }}
        >
          나의 여행계획 <StPlanP>LIST</StPlanP>
        </StMyTitle>
      </StTitles>

      <StMyPlace>{isLoading ? <div>Loading...</div> : isWhat == 'like' ? <LikedCard /> : <MyPlanCard />}</StMyPlace>
    </>
  );
}

export default MyPage;

const StTitles = styled.div`
  display: flex;
  .active-like {
    background-color: rgba(0, 100, 255, 0.2);
    padding: 5px 10px;
    border-radius: 5px;
    box-shadow: 0 4px 20px rgba(0, 100, 255, 0.2);
    opacity: 1;
  }
  .active-plan {
    background-color: rgba(255, 100, 0, 0.2);
    padding: 5px;
    border-radius: 5px;
    box-shadow: 0 4px 20px rgba(255, 100, 0, 0.2);
    opacity: 1;
  }
`;

const StMyTitle = styled.h2`
  display: flex;
  padding: 5px;
  font-size: 30px;
  margin: 130px auto 20px;
  opacity: 0.5;
  cursor: pointer;
`;
const StLikeP = styled.p`
  color: rgba(0, 100, 255, 0.4);
`;
const StPlanP = styled.p`
  color: rgba(255, 100, 0, 0.4);
`;
const StMyPlace = styled.div`
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
`;

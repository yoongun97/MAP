import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { getPlaceData } from '../api/places';
import { setPlaces } from '../redux/modules/places';
import LikedCard from '../components/likedlist/LikedCard';

const StMyTitle = styled.h2`
  font-size: 30px;
  margin: 130px auto 20px 15%;
`;

const StMyPlace = styled.div`
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
`;

function MyPage() {
  const dispatch = useDispatch();
  const { isLoading, data } = useQuery('placeData', getPlaceData);

  useEffect(() => {
    dispatch(setPlaces(data));
  }, [data]);

  return (
    <>
      <StMyTitle>나의 여행지 List</StMyTitle>
      <StMyPlace>{isLoading ? <div>Loading...</div> : <LikedCard />}</StMyPlace>
    </>
  );
}

export default MyPage;

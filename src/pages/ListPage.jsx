import React from 'react';
import PlaceCards from '../components/list/placeCard/PlaceCards';
import Poster from '../components/list/poster/Poster';
import ListSearchingBox from '../components/list/listSearchingBox/ListSearchingBox';

const ListPage = () => {
  //헤더
  //포스터
  //검색
  //카드리스트
  return (
    <div>
      <Poster />
      <ListSearchingBox />
      <PlaceCards />
    </div>
  );
};

export default ListPage;

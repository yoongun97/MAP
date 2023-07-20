import React, { useEffect } from 'react';
import PlaceCards from '../components/list/placeCard/PlaceCards';
import Poster from '../components/list/poster/Poster';
import ListSearchingBox from '../components/list/listSearchingBox/ListSearchingBox';
import { useQuery } from 'react-query';
import { getPlaceData } from '../api/places';
import { useDispatch } from 'react-redux';
import { setPlaces } from '../redux/modules/places';
import { ReactComponent as Spinner } from '../assets/Spinner.svg';
const ListPage = () => {
  const dispatch = useDispatch();
  const { isLoading, data } = useQuery('placeData', getPlaceData);

  useEffect(() => {
    dispatch(setPlaces(data));
  }, [data]);

  return (
    <div>
      <Poster />
      <ListSearchingBox />
      {isLoading ? <Spinner /> : <PlaceCards />}
    </div>
  );
};

export default ListPage;

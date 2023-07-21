import React, { useEffect, useState } from 'react';
import * as S from './StyledDetail';
import KakaoMap from './KakaoMap';
import { onLoadKakaoMap, allMarkers } from '../../api/kakao';
import List from './List';
import { getDetailPlaceData } from '../../api/places';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const { placeId } = useParams();
  const [place, setPlace] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDetailPlaceData(placeId);
      setPlace(data);
    };
    fetchData();
  }, []);

  // script를 만들어 kakao api를 받아온다.
  const mapScript = document.createElement('script');

  mapScript.defer = true;
  mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&autoload=false`;

  document.head.appendChild(mapScript);

  // mapScript가 로드되면 onLoadKakaoMap 실행
  mapScript.addEventListener('load', () => {
    if (place) {
      onLoadKakaoMap(place.mapY, place.mapX);
    }
  });

  return (
    <S.detailContainer>
      <S.detailBox>상세 페이지</S.detailBox>
      <KakaoMap />
      <button onClick={() => allMarkers()}>초기화</button>
      {place && <List place={place} />}
    </S.detailContainer>
  );
};

export default Detail;

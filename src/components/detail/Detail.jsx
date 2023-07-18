import React, { useEffect } from 'react';
import * as S from './StyledDetail';
const Detail = () => {
  // 추후 파일을 분리 할 예정. script를 만들어 kakao api를 받아온다.
  const mapScript = document.createElement('script');

  mapScript.defer = true;
  mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&autoload=false`;

  document.head.appendChild(mapScript);

  useEffect(() => {
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3 // 지도의 확대 레벨
        };
        new window.kakao.maps.Map(mapContainer, mapOption);
      });
    };
    mapScript.addEventListener('load', onLoadKakaoMap);
  }, []);

  return (
    <S.detailContainer>
      <S.detailBox>상세 페이지</S.detailBox>
      <S.detailKakaoMap id="map"></S.detailKakaoMap>
      <S.detailPlaceList>아이템 리스트</S.detailPlaceList>
    </S.detailContainer>
  );
};

export default Detail;

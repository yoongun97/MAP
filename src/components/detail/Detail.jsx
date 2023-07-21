import React from 'react';
import * as S from './StyledDetail';
import noImage from '../../assets/noimage.png';
import KakaoMap from './KakaoMap';
import { onClickSpotCreateMarker, onLoadKakaoMap, allMarkers } from '../../api/kakao';
import { items } from '../../constant/items';
import List from './List';
const Detail = () => {
  // script를 만들어 kakao api를 받아온다.
  const mapScript = document.createElement('script');

  mapScript.defer = true;
  mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&autoload=false`;

  document.head.appendChild(mapScript);

  // mapScript가 로드되면 onLoadKakaoMap 실행
  mapScript.addEventListener('load', onLoadKakaoMap);

  return (
    <S.detailContainer>
      <S.detailBox>상세 페이지</S.detailBox>
      <KakaoMap />
      {/* <button onClick={() => allMarkers()}>초기화</button> */}
      <List />
    </S.detailContainer>
  );
};

export default Detail;

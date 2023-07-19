import React from 'react';
import * as S from './StyledDetail';
import noImage from '../../assets/noimage.png';
import KakaoMap from './KakaoMap';
import { onClickSpotCreateMarker, onLoadKakaoMap, allMarkers } from '../../api/kakao';
import { items } from '../../constant/items';
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
      <button onClick={() => allMarkers()}>초기화</button>
      <S.detailPlaceList>
        <S.spotList>
          {items.map((item) => {
            return (
              <S.spotCard
                key={item.contentid}
                onClick={() => onClickSpotCreateMarker(item.mapy, item.mapx, item.title)}
              >
                <S.spotImage>
                  {item.firstimage ? (
                    <img src={item.firstimage} alt="명소 이미지" />
                  ) : (
                    <img src={noImage} alt="이미지 없음" />
                  )}
                </S.spotImage>
                <div>
                  <p>{item.title}</p>
                  <span>{item.addr1}</span>
                </div>
              </S.spotCard>
            );
          })}
        </S.spotList>
      </S.detailPlaceList>
    </S.detailContainer>
  );
};

export default Detail;

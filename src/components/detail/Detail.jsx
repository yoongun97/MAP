import React from 'react';
import * as S from './StyledDetail';
import noImage from '../../assets/noimage.png';
import KakaoMap from './KakaoMap';
import { onClickSpotCreateMarker, onLoadKakaoMap } from '../../api/kakao';
const Detail = () => {
  // 추후 tourAPI 연동시 변경 - 삭제
  const items = [
    {
      addr1: '제주특별자치도 제주시 애월읍 평화로 2144',
      addr2: '(애월읍)',
      areacode: '39',
      contentid: '637398',
      firstimage: 'http://tong.visitkorea.or.kr/cms/resource/27/1950527_image2_1.jpg',
      firstimage2: 'http://tong.visitkorea.or.kr/cms/resource/27/1950527_image3_1.jpg',
      mapx: '126.3980250961',
      mapy: '33.4042417055',
      title: '말 테마파크 골프장 (렛츠런파크 제주)'
    },
    {
      addr1: '제주특별자치도 제주시 애월읍 하소로 684-25',
      addr2: '',
      areacode: '39',
      contentid: '2743787',
      firstimage: 'http://tong.visitkorea.or.kr/cms/resource/32/2744732_image2_1.JPG',
      firstimage2: 'http://tong.visitkorea.or.kr/cms/resource/32/2744732_image2_1.JPG',
      mapx: '126.3937028464',
      mapy: '33.4221618770',
      title: '유수암 캠핑장'
    },
    {
      addr1: '제주특별자치도 제주시 애월읍 녹고메길 152-1',
      addr2: '(애월읍)',
      areacode: '39',
      contentid: '1755101',
      firstimage: '',
      firstimage2: '',
      mapx: '126.4061271508',
      mapy: '33.4050889621',
      title: '제주승마공원'
    }
  ];
  // 추후 파일을 분리 할 예정. script를 만들어 kakao api를 받아온다.
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
      <S.detailPlaceList>
        <S.spotList>
          {items.map((item) => {
            return (
              <S.spotCard key={item.contentid} onClick={() => onClickSpotCreateMarker(item.mapy, item.mapx)}>
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

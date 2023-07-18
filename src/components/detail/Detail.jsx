import React from 'react';
import * as S from './StyledDetail';

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

  // onLoadKakaoMap 함수 밖에서 사용할 수 있도록 선언
  let map;
  let marker;
  let positionX;
  let positionY;

  const onLoadKakaoMap = () => {
    // window에서 전역객체 kakao를 가져온다.
    const kakao = window.kakao;

    // kakao.maps.load : v3 스크립트를 동적으로 로드하기위해 사용한다.
    // 스크립트의 로딩이 끝나기 전에 v3의 객체에 접근하려고 하면 에러가 발생하기 때문에
    // 로딩이 끝나는 시점에 콜백을 통해 객체에 접근할 수 있도록 해 준다.
    kakao.maps.load(() => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new kakao.maps.LatLng(33.4141, 126.39618), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
      };

      // 지도 완성
      map = new kakao.maps.Map(mapContainer, mapOption);

      marker = new kakao.maps.Marker({
        // 지도 중심좌표에 마커 생성
        position: map.getCenter()
      });
      marker.setMap(map);

      // 지도에 클릭 이벤트 등록
      // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출
      kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
        // 클릭한 위도, 경도 정보를 가져옵니다
        let latlng = mouseEvent.latLng;

        // 마커 위치를 클릭한 위치로 옮깁니다
        console.log(latlng);
        marker.setPosition(latlng);
        positionX = latlng.getLat();
        positionY = latlng.getLng();
        let message = '클릭한 위치의 위도는 ' + positionX + ' 이고, ';
        message += '경도는 ' + positionY + ' 입니다';

        alert(message);
      });
    });
  };

  const onClickSpotCreateMarker = (lat, lng) => {
    if (!map) return; // map이 초기화되지 않았을 경우 처리

    const kakao = window.kakao;
    // 이미 마커가 생성된 경우 삭제
    if (marker) {
      marker.setMap(null);
    }

    // 위도와 경도를 받아 설정
    const latlng = new kakao.maps.LatLng(lat, lng);

    // 마커의 위치 설정
    marker = new kakao.maps.Marker({
      position: latlng
    });

    // 지도 중심을 부드럽게 이동
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동
    map.panTo(latlng);

    // 마커를 세운다.
    marker.setMap(map);
  };

  // mapScript가 로드되면 onLoadKakaoMap 실행
  mapScript.addEventListener('load', onLoadKakaoMap);
  return (
    <S.detailContainer>
      <S.detailBox>상세 페이지</S.detailBox>
      <S.detailKakaoMap id="map"></S.detailKakaoMap>
      <S.detailPlaceList>
        <S.spotList>
          {items.map((item) => {
            return (
              <S.spotCard key={item.contentid} onClick={() => onClickSpotCreateMarker(item.mapy, item.mapx)}>
                <S.spotImage>
                  {item.firstimage ? (
                    <img src={item.firstimage} alt="명소 이미지" />
                  ) : (
                    <img src="../../assets/noimage.png" alt="이미지 없음" />
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

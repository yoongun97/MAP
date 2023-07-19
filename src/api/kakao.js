// onLoadKakaoMap 함수 밖에서 사용할 수 있도록 선언
let map;
let marker;
let positionX;
let positionY;

export const onLoadKakaoMap = () => {
  // window에서 전역객체 kakao를 가져온다.
  const kakao = window.kakao;

  // kakao.maps.load : v3 스크립트를 동적으로 로드하기위해 사용한다.
  // 스크립트의 로딩이 끝나기 전에 v3의 객체에 접근하려고 하면 에러가 발생하기 때문에
  // 로딩이 끝나는 시점에 콜백을 통해 객체에 접근할 수 있도록 해 준다.
  kakao.maps.load(() => {
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new kakao.maps.LatLng(33.4141, 126.39618), // 지도의 중심좌표
      level: 5 // 지도의 확대 레벨
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

export const onClickSpotCreateMarker = (lat, lng) => {
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

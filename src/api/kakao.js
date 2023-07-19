import { items } from '../constant/items';
// onLoadKakaoMap 함수 밖에서 사용할 수 있도록 선언
let map;
let marker;
// let positionX;
// let positionY;

// 마커 배열
let markers = [];

// 마커 세팅, 기존 값 초기화에 사용.
const setMarkers = (map) => {
  markers.forEach((marker) => {
    marker.setMap(map);
  });
};

export const allMarkers = () => {
  setMarkers(null);
  items.forEach((item) => {
    // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    const iwContent = `<div style="padding:5px;">${item.title}</div>`;

    // 인포윈도우를 생성합니다
    const infowindow = new window.kakao.maps.InfoWindow({
      content: iwContent
    });
    const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

    // 마커 이미지의 이미지 크기 입니다
    const imageSize = new window.kakao.maps.Size(24, 35);

    // 마커 이미지를 생성합니다
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

    // 마커를 생성합니다
    const latlng = new window.kakao.maps.LatLng(item.mapy, item.mapx);

    addMarker(latlng, infowindow, markerImage);
  });
};

// 마커에 마우스오버 이벤트 등록
const openInfoWindow = (marker, infowindow) => {
  window.kakao.maps.event.addListener(marker, 'mouseover', function () {
    // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
    infowindow.open(map, marker);
  });
};

// 마커에 마우스아웃 이벤트 등록
const closeInfoWindow = (marker, infowindow) => {
  window.kakao.maps.event.addListener(marker, 'mouseout', function () {
    // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
    infowindow.close();
  });
};

// 마커를 추가하는 함수
const addMarker = (position, infowindow, markerImage) => {
  markerImage
    ? (marker = new window.kakao.maps.Marker({
        position: position,
        image: markerImage
      }))
    : (marker = new window.kakao.maps.Marker({
        position: position
      }));

  // mouseover : openInfoWindow
  // mouseout  : closeInfoWindow
  if (infowindow) {
    openInfoWindow(marker, infowindow);
    closeInfoWindow(marker, infowindow);
  }

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);

  // 생성된 마커를 배열에 추가합니다
  markers.push(marker);
};

export const onLoadKakaoMap = () => {
  // window에서 전역객체 kakao를 가져온다.
  const kakao = window.kakao;

  // kakao.maps.load : v3 스크립트를 동적으로 로드하기위해 사용한다.
  // 스크립트의 로딩이 끝나기 전에 v3의 객체에 접근하려고 하면 에러가 발생하기 때문에
  // 로딩이 끝나는 시점에 콜백을 통해 객체에 접근할 수 있도록 해 준다.
  kakao.maps.load(() => {
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new kakao.maps.LatLng(33.375401437086374, 126.54367184964627), // 지도의 중심좌표
      level: 10 // 지도의 확대 레벨
    };

    // 지도 완성
    map = new kakao.maps.Map(mapContainer, mapOption);

    allMarkers();
    // 지도에 클릭 이벤트 등록
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출
    kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
      // 초기에 보여주던 마커들을 삭제합니다
      setMarkers(null);

      // 클릭한 위도, 경도 정보를 가져옵니다
      const latlng = mouseEvent.latLng;

      // 마커 위치를 클릭한 위치로 옮깁니다
      addMarker(latlng);

      // 확인 및 다른 컴포넌트에서 필요할 경우 사용하는 positionX와 positionY
      //   positionX = latlng.getLat();
      //   positionY = latlng.getLng();
      //   let message = '클릭한 위치의 위도는 ' + positionX + ' 이고, ';
      //   message += '경도는 ' + positionY + ' 입니다';

      //   alert(message);
    });
  });
};

// 관광지 클릭 시 기존 마커 지우고 클릭한 마커 출력
export const onClickSpotCreateMarker = (lat, lng, title) => {
  if (!map) return; // map이 초기화되지 않았을 경우 처리

  // 이미 마커가 생성된 경우 삭제
  if (marker) {
    setMarkers(null);
  }

  // 위도와 경도를 받아 설정
  const latlng = new window.kakao.maps.LatLng(lat, lng);

  // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
  const iwContent = `<div style="padding:5px;">${title}</div>`;

  // 인포윈도우를 생성합니다
  const infowindow = new window.kakao.maps.InfoWindow({
    content: iwContent
  });

  // 마커 생성
  addMarker(latlng, infowindow);

  // 지도 중심을 부드럽게 이동
  // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동
  map.panTo(latlng);
};

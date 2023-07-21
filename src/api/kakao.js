import { fakeDispatch, fetchkakao } from '../redux/modules/kakao';
import store from '../redux/config/configStore';

// onLoadKakaoMap 함수 밖에서 사용할 수 있도록 선언
let map;
let marker;

// 마커 배열
let markers = [];
let isMarkers = [];
// let places;
// export const getPlacesForKakao = (pp) => {
//   console.log('get > ', pp);
//   places = pp;
// };

// 마커 세팅. 마커를 안보이게 하는데 사용.
const resetMarkers = (map) => {
  markers.forEach((marker) => {
    // 지도에서 찍힌 마커를 안보이게 한다.
    marker.setMap(map);
  });
  markers = [];
  isMarkers = [];
};

// 아이템의 마커가 있는 상태에서 마커 클릭 시 마커 지우기
const deleteMarker = (title) => {
  let filteringIndex;

  isMarkers.forEach((marker, index) => {
    if (marker === title) {
      filteringIndex = index;
      markers[index].setMap(null);
    }
  });
  isMarkers = isMarkers.filter((_, index) => index !== filteringIndex);
  markers = markers.filter((_, index) => index !== filteringIndex);
};

// 마커를 추가하는 함수
const addMarker = (position, infowindow, markerImage, title) => {
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
  isMarkers.push(title);
};

// 지도 클릭 시 주변 관광지 마커 보이기
export const allMarkers = () => {
  resetMarkers(null);

  const kakao = window.kakao;
  const places = store.getState().tourPlacesReducer.tourPlaces;
  places.forEach((place) => {
    // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    const iwContent = `<div style="padding:5px;">${place.title}</div>`;

    // 인포윈도우를 생성합니다
    const infowindow = new kakao.maps.InfoWindow({
      content: iwContent
    });

    // 마커를 생성합니다
    const latlng = new kakao.maps.LatLng(place.mapy, place.mapx);

    addMarker(latlng, infowindow);
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

export const onLoadKakaoMap = (mapY, mapX) => {
  // window에서 전역객체 kakao를 가져온다.
  const kakao = window.kakao;

  // kakao.maps.load : v3 스크립트를 동적으로 로드하기위해 사용한다.
  // 스크립트의 로딩이 끝나기 전에 v3의 객체에 접근하려고 하면 에러가 발생하기 때문에
  // 로딩이 끝나는 시점에 콜백을 통해 객체에 접근할 수 있도록 해 준다.
  kakao.maps.load(() => {
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new kakao.maps.LatLng(mapY, mapX), // 지도의 중심좌표
      level: 6 // 지도의 확대 레벨
    };

    // 지도 완성
    map = new kakao.maps.Map(mapContainer, mapOption);

    // 지도에 클릭 이벤트 등록
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출
    kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
      // 초기에 보여주던 마커들을 삭제합니다
      resetMarkers(null);

      // 클릭한 위도, 경도 정보를 가져옵니다
      const latlng = mouseEvent.latLng;

      const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
      // 마커 이미지의 이미지 크기 입니다
      const imageSize = new kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 확인 및 다른 컴포넌트에서 필요할 경우 사용하는 positionX와 positionY
      store.dispatch(fetchkakao(latlng));
      store.dispatch(fakeDispatch());

      // 클릭한 위치를 기반으로 근처 item들의 마커를 보여줍니다.
      allMarkers();

      // 마커 위치를 클릭한 위치로 옮깁니다
      addMarker(latlng, '', markerImage);
    });
  });
};

// 관광지 클릭 시 기존 마커 지우고 클릭한 마커 출력
export const onClickSpotCreateMarker = (lat, lng, title) => {
  if (!map) return; // map이 초기화되지 않았을 경우 처리

  // 이미 마커가 생성된 경우 삭제
  resetMarkers(null);

  if (isMarkers.filter((marker) => marker === title)[0]) {
    deleteMarker(title);
    return;
  } else {
    const latlng = new window.kakao.maps.LatLng(lat, lng);

    // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    const iwContent = `<div style="padding:5px;">${title}</div>`;

    // 인포윈도우를 생성합니다
    const infowindow = new window.kakao.maps.InfoWindow({
      content: iwContent
    });

    // 마커 생성
    addMarker(latlng, infowindow, '', title);

    // console.log(markers);
    // 지도 중심을 부드럽게 이동
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동
    map.panTo(latlng);
  }
  // console.log(markers);
  // 위도와 경도를 받아 설정

  console.log('종료 > ', markers);
};

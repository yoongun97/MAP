import { fetchkakao } from '../redux/modules/kakao';
import { getPlaces } from './tourPlaces';
import store from '../redux/config/configStore';

let map;
const markers = new Map(); // 관광지 제목(title)과 해당 마커(Marker)를 연결하는 Map

// 마커를 추가하는 함수
const addMarker = (position, infowindow, markerImage, title) => {
  const marker = markerImage
    ? new window.kakao.maps.Marker({
        position: position,
        image: markerImage
      })
    : new window.kakao.maps.Marker({
        position: position
      });

  if (infowindow) {
    openInfoWindow(marker, infowindow); // 마커에 마우스 오버 이벤트 등록
    closeInfoWindow(marker, infowindow); // 마커에 마우스 아웃 이벤트 등록
  }

  marker.setMap(map); // 마커를 지도 위에 표시

  markers.set(title, marker); // 마커를 Map에 추가하여 관광지 제목(title)과 연결
};

// 주변 관광지 마커 보이기
export const allMarkers = async (latlng) => {
  markers.forEach((marker) => marker.setMap(null)); // 기존의 모든 마커 삭제
  markers.clear(); // Map 초기화

  try {
    const places = await getPlaces('12', 'A', '5000', latlng.getLng(), latlng.getLat(), 1); // API를 통해 관광지 데이터 가져오기
    places.forEach((place) => {
      const iwContent = `<div style="padding:5px;">${place.title}</div>`; // 인포윈도우에 표출될 내용
      const infowindow = new window.kakao.maps.InfoWindow({
        content: iwContent
      });
      const position = new window.kakao.maps.LatLng(place.mapy, place.mapx); // 관광지의 위도와 경도로 LatLng 객체 생성
      addMarker(position, infowindow, null, place.title); // 마커 추가
    });
  } catch (error) {
    console.error('Error while fetching places:', error);
  }
};

// 마커에 마우스오버 이벤트 등록
const openInfoWindow = (marker, infowindow) => {
  window.kakao.maps.event.addListener(marker, 'mouseover', function () {
    infowindow.open(map, marker); // 마커에 마우스 오버 시 인포윈도우 표시
  });
};

// 마커에 마우스아웃 이벤트 등록
const closeInfoWindow = (marker, infowindow) => {
  window.kakao.maps.event.addListener(marker, 'mouseout', function () {
    infowindow.close(); // 마커에 마우스 아웃 시 인포윈도우 닫기
  });
};

// 마커 초기화 함수
const resetMarkers = () => {
  markers.forEach((marker) => marker.setMap(null)); // 모든 마커 삭제
  markers.clear(); // Map 초기화
};

export const onLoadKakaoMap = (mapY, mapX) => {
  const kakao = window.kakao;

  kakao.maps.load(() => {
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new kakao.maps.LatLng(mapY, mapX),
      level: 6
    };

    map = new kakao.maps.Map(mapContainer, mapOption);

    kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
      resetMarkers(); // 클릭 시 기존 마커 초기화

      const latlng = mouseEvent.latLng; // 클릭한 위도, 경도 정보 가져오기
      const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
      const imageSize = new kakao.maps.Size(24, 35);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      store.dispatch(fetchkakao(latlng)); // 다른 컴포넌트에서 필요한 데이터 가져오기

      allMarkers(latlng); // 클릭한 위치를 기반으로 주변 관광지 마커 보이기
      addMarker(latlng, '', markerImage); // 마커 추가
    });
  });
};

// 관광지 클릭 시 기존 마커 지우고 클릭한 마커 출력
export const onClickSpotCreateMarker = (lat, lng, title) => {
  if (!map) return;
  resetMarkers(null);
  // 이미 해당 관광지 제목(title)의 마커가 생성된 경우, 해당 마커를 삭제하고 함수를 종료합니다.

  // 해당 관광지 제목(title)의 마커가 없는 경우, 새로운 마커를 추가합니다.
  const latlng = new window.kakao.maps.LatLng(lat, lng);
  const iwContent = `<div style="padding:5px;">${title}</div>`;
  const infowindow = new window.kakao.maps.InfoWindow({
    content: iwContent
  });

  addMarker(latlng, infowindow, '', title); // 클릭한 위치에 새로운 마커 추가
  map.panTo(latlng); // 지도 중심을 클릭한 위치로 이동
};

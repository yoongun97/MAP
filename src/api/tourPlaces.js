import api from './index';

/**
 * @param {string} contentTypeId 관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) ID
 * @param {string} arrange 정렬구분 (A=제목순, C=수정일순, D=생성일순) 대표이미지가반드시있는정렬(O=제목순, Q=수정일순, R=생성일순)
 * @param {string} mapX GPS X좌표(WGS84 경도좌표)
 * @param {string} mapY GPS Y좌표(WGS84 위도좌표)
 * @param {string} radius 거리반경(단위:m) , Max값 20000m=20Km
 * @param {string} pageNo 페이지 넘버
 */

export async function getPlaces(contentTypeId, arrange, radius, mapX, mapY, pageNo) {
  const res = await api.get('/locationBasedList1', {
    params: {
      ServiceKey: '1HhXMaFJA8upZ2e83fs8otwyYyB40nn64bm9cw1V+4PjoV4bkdwBSWLh44xCIyBi1oZIvFTCsehf1+kOqsUHqg==',
      contentTypeId: contentTypeId,
      arrange: arrange,
      radius: radius,
      mapX: mapX,
      mapY: mapY,
      pageNo: pageNo,
      numOfRows: 6,
      MobileApp: 'AppTest',
      MobileOS: 'WIN',
      listYN: 'Y',
      _type: 'json'
    }
  });
  return res.data.response.body.items.item;
}

/**
 * @param {string} contentTypeId 관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) ID
 * @param {string} arrange 정렬구분 (A=제목순, C=수정일순, D=생성일순) 대표이미지가반드시있는정렬(O=제목순, Q=수정일순, R=생성일순)
 * @param {string} areaCode 지역코드
 * @param {string} sigunguCode 시군구코드
 * @param {string} pageNo 페이지 넘버
 */
export async function getPlacesAreaBased(contentTypeId, areaCode, sigunguCode, arrange, pageNo) {
  const res = await api.get('/areaBasedList1', {
    params: {
      ServiceKey: '1HhXMaFJA8upZ2e83fs8otwyYyB40nn64bm9cw1V+4PjoV4bkdwBSWLh44xCIyBi1oZIvFTCsehf1+kOqsUHqg==',
      areaCode: areaCode,
      contentTypeId: contentTypeId,
      sigunguCode: sigunguCode,
      arrange: arrange,
      pageNo: pageNo,
      numOfRows: 6,
      MobileApp: 'AppTest',
      MobileOS: 'WIN',
      listYN: 'Y',
      _type: 'json'
    }
  });
  return res.data.response.body.items.item;
}

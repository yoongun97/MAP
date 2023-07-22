import React, { useEffect, useRef, useState } from 'react';
import * as S from './StyledDetail';
import KakaoMap from './KakaoMap';
import { onLoadKakaoMap, allMarkers } from '../../api/kakao';
import List from './List';
import { getDetailPlaceData } from '../../api/places';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const planBoxRef = useRef(null);
  const { placeId } = useParams();
  const [place, setPlace] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDetailPlaceData(placeId);
      setPlace({ ...data, placeId });
    };
    fetchData();
  }, []);

  // script를 만들어 kakao api를 받아온다.
  const mapScript = document.createElement('script');

  mapScript.defer = true;
  mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&autoload=false`;

  document.head.appendChild(mapScript);

  // mapScript가 로드되면 onLoadKakaoMap 실행
  mapScript.addEventListener('load', () => {
    if (place) {
      onLoadKakaoMap(place.mapY, place.mapX);
    }
  });
  const [isShow, setIsShow] = useState(false);
  const handlePlanBox = () => {
    if (planBoxRef.current.getAttribute('class').includes('slide-in')) {
      planBoxRef.current.setAttribute('class', 'planning-box slide-out');
      console.log(planBoxRef.current);
      setTimeout(() => {
        setIsShow(!isShow);
      }, 500);
    } else {
      planBoxRef.current.setAttribute('class', 'planning-box slide-in');
      console.log(planBoxRef.current);
      setIsShow(!isShow);
    }
  };
  console.log(planBoxRef.current);
  return (
    <S.detailContainer>
      {/* <S.detailBox>상세 페이지</S.detailBox> */}
      <KakaoMap />
      {/* <button onClick={() => allMarkers()}>초기화</button> */}
      {place && <List place={place} />}
      <S.toggleBtn onClick={handlePlanBox}>여행계획작성하기</S.toggleBtn>
      <S.planningBox $view={isShow}>
        <div ref={planBoxRef} className="planning-box">
          <div className="icon-box" onClick={handlePlanBox}>
            <span className="drop-down-icon"></span>
          </div>
        </div>
      </S.planningBox>
    </S.detailContainer>
  );
};

export default Detail;

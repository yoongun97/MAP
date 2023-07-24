import { React, useEffect, useState, useCallback, useRef } from 'react';
import * as S from './StyledDetail';
import { onClickSpotCreateMarker } from '../../api/kakao';
import noImage from '../../assets/noimage.png';
import { ReactComponent as Spinner } from '../../assets/Spinner.svg';
import useInfiniteScoll from '../../hooks/useInfiniteScroll';
import { useSelector, useDispatch } from 'react-redux';
import { setIsMarkedMarked } from '../../redux/modules/kakao';
import {
  fecthTourPlaces,
  fecthTourPlacesBasedAreaCode,
  setDisplayPlace,
  setPlace
} from '../../redux/modules/tourPlaces';
import { auth } from '../../firebase';
import { addTourPlace, initTourPlaceData } from '../../redux/modules/plan';

function List({ place, isShowPlanAdd }) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const currentUser = auth.currentUser?.uid ?? '';
  const { tourPlaces, loading, nothing } = useSelector((state) => state.tourPlacesReducer);

  // 여행 계획 데이터가 필요하다면 plan을 구조분해할당하여 받아오면 된다.
  const { selectedTime } = useSelector((state) => state.planReducer);

  // loading 여부 확인이 필요하다면 kakaoLoading을 구조분해할당하여 받아오면 된다.
  const { kakao, isMarked, isMarkedMarked } = useSelector((state) => state.kakaoReducer);
  const [page, setPage] = useState(1);

  const markMap = () => {
    setPage(() => {
      return 1;
    });
    dispatch(setPlace([]));
  };

  if (isMarked && !isMarkedMarked) {
    markMap();
    dispatch(setIsMarkedMarked());
  }

  const increasePage = useCallback(() => {
    setPage((prev) => {
      return prev + 1;
    });
  }, []);

  const [observe, unobserve] = useInfiniteScoll(increasePage);

  useEffect(() => {
    dispatch(initTourPlaceData({ placeId: place.placeId, userId: currentUser }));
    unobserve(ref.current);
    markMap();
  }, [kakao]);

  useEffect(() => {
    const fetchPlaces = () => {
      dispatch(
        fecthTourPlaces({
          contentTypeId: '12',
          arrange: 'A',
          mapX: kakao.mapX,
          mapY: kakao.mapY,
          radius: '5000',
          pageNo: page,
          ob: () => observe(ref.current),
          unob: () => unobserve(ref.current)
        })
      );
    };

    const fetchPlacesBasedAreaCode = () => {
      dispatch(
        fecthTourPlacesBasedAreaCode({
          contentTypeId: '12',
          arrange: 'A',
          areaCode: place.areaCode,
          sigunguCode: place.sigunguCode,
          pageNo: page,
          ob: () => observe(ref.current),
          unob: () => unobserve(ref.current)
        })
      );
    };

    if (!isMarked) {
      fetchPlacesBasedAreaCode();
    } else {
      fetchPlaces();
    }
  }, [page, isMarked, kakao]);

  // + 버튼 클릭 이벤트
  const handleAddToPlan = (selectedPlace) => {
    dispatch(setDisplayPlace(selectedPlace.contentid));
    dispatch(addTourPlace({ when: selectedTime, selectedPlace }));
  };

  return (
    <S.detailPlaceList>
      <div className="rec-div">
        <p>추천장소</p>
      </div>
      <S.spotList>
        {tourPlaces.length > 0
          ? tourPlaces.map((item) => {
              return item.visible ? (
                <S.spotCard
                  key={item?.contentid}
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
                    <S.StTitle>{item.title}</S.StTitle>
                    <S.StDesc>{item.addr1}</S.StDesc>
                  </div>
                  {isShowPlanAdd && (
                    <button className="placeAddBtn" onClick={() => handleAddToPlan(item)}>
                      +
                    </button>
                  )}
                </S.spotCard>
              ) : (
                <div key={item.contentid}></div>
              );
            })
          : nothing && <>없습니다</>}

        <div className="ob-div" ref={ref}>
          {loading && <Spinner />}
        </div>
      </S.spotList>
    </S.detailPlaceList>
  );
}
export default List;

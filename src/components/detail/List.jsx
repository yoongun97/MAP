import { React, useEffect, useState, useCallback, useRef } from 'react';
import * as S from './StyledDetail';
import { items } from '../../constant/items';
import { onClickSpotCreateMarker } from '../../api/kakao';
import noImage from '../../assets/noimage.png';
import { ReactComponent as Spinner } from '../../assets/Spinner.svg';
import useInfiniteScoll from '../../hooks/useInfiniteScroll';
import { useParams } from 'react-router';
import { getDetailPlaceData } from '../../api/places';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fecthTourPlaces } from '../../redux/modules/tourPlaces';
function List() {
  const dispatch = useDispatch();
  const { tourPlaces, loading } = useSelector((state) => state.tourPlacesReducer);
  const { placeId } = useParams();
  const ref = useRef(null);
  const [place, setPlace] = useState(null);
  const [page, setPage] = useState(1);

  const increasePage = useCallback(() => {
    setPage((prev) => {
      return prev + 1;
    });
  });
  const [observe, unobserve] = useInfiniteScoll(increasePage);

  useEffect(() => {
    const fetchData = async () => {
      const placeData = await getDetailPlaceData(placeId);
      setPlace(placeData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchPlaces = () => {
      dispatch(
        fecthTourPlaces({
          contentTypeId: '12',
          arrange: 'A',
          mapX: place.mapX,
          mapY: place.mapY,
          radius: '20000',
          pageNo: page,
          ob: () => observe(ref.current),
          unob: () => unobserve(ref.current)
        })
      );
    };
    if (place) {
      fetchPlaces();
    }
  }, [page, place]);

  return (
    <S.detailPlaceList>
      <div className="rec-div">
        <p>추천장소</p>
      </div>
      <S.spotList>
        {tourPlaces.map((item) => {
          return (
            <S.spotCard key={item.contentid} onClick={() => onClickSpotCreateMarker(item.mapy, item.mapx, item.title)}>
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
            </S.spotCard>
          );
        })}
        <div className="ob-div" ref={ref}>
          {loading && <Spinner />}
        </div>
      </S.spotList>
    </S.detailPlaceList>
  );
}
export default List;

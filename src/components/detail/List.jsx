import { React, useEffect, useState, useCallback, useRef } from 'react';
import * as S from './StyledDetail';
import styled from 'styled-components';
import { items } from '../../constant/items';
import { onClickSpotCreateMarker } from '../../api/kakao';
import noImage from '../../assets/noimage.png';
import { getPlaces } from '../../api/tourPlaces';
import { ReactComponent as Spinner } from '../../assets/Spinner.svg';
import useInfiniteScoll from '../../hooks/useInfiniteScroll';
function List() {
  const [page, setPage] = useState(1);
  const increasePage = useCallback(() => {
    setPage(page + 1);
  });
  const ref = useRef(null);
  const [observe, unobserve] = useInfiniteScoll(increasePage);
  useEffect(() => {
    //fetch하는 로직
  }, [page]);
  return (
    <S.detailPlaceList>
      <S.spotList>
        <>
          {items.map((item) => {
            return (
              <S.spotCard
                key={item.contentid}
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
              </S.spotCard>
            );
          })}
          <Spinner ref={ref} />
        </>
      </S.spotList>
    </S.detailPlaceList>
  );
}

export default List;

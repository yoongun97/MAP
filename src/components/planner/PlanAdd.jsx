import React, { useState, useEffect } from 'react';
import * as P from './StyledPlanAdd';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedTime,
  setTextSpot,
  deleteTourPlace,
  writePlan,
  deleteAllTourPlace,
  setPlanTitle
} from '../../redux/modules/plan';
import noImage from '../../assets/noimage.png';
import { setDisplayPlace } from '../../redux/modules/tourPlaces';

function PlanAdd(plans) {
  const dispatch = useDispatch();

  const [selectedTimeBtn, setSelectedTimeBtn] = useState(1); // 선택된 timeBtn 상태 추가

  // error 또는 상태 message가 필요하다면 받아오면 된다.
  const { plan } = useSelector((state) => state.planReducer);

  const [planText, setPlanText] = useState('');

  const timeButtons = [1, 2, 3, 4, 5];

  useEffect(() => {
    dispatch(deleteAllTourPlace()); //한번 다 지워줘야됌
  }, []);

  const handleTimeBtnClick = (time) => {
    setSelectedTimeBtn(time); // 선택된 timeBtn 상태 업데이트
    dispatch(setSelectedTime(time));
  };

  const handlePlanTitleChange = (e) => {
    dispatch(setPlanTitle(e.target.value));
  };

  const handlePlanTextChange = (e, day, index) => {
    dispatch(setTextSpot({ text: e.target.value, day, index }));
  };

  const handleAddBtnClick = async () => {
    plans.handlePlanBox();
    setPlanText('');
    setSelectedTimeBtn(1);
    console.log('plan', plan);
    dispatch(writePlan(plan));
  };

  const handleDeletePlan = (e, day, index, contentid) => {
    dispatch(setDisplayPlace(contentid));
    dispatch(deleteTourPlace({ day, index }));
  };

  return (
    <>
      <P.planHeader>
        <P.planTitle
          placeholder="여행 제목(테마)을 입력해주세요."
          onChange={(e) => {
            handlePlanTitleChange(e);
          }}
        ></P.planTitle>
        <P.planAddBtn onClick={handleAddBtnClick}>작성하기</P.planAddBtn>
      </P.planHeader>
      <P.planContainer>
        <P.timeBtnBox>
          {timeButtons.map((time) => (
            <button
              key={time}
              className={`timeBtn ${selectedTimeBtn === time ? 'active' : ''}`}
              onClick={() => handleTimeBtnClick(time)}
            >
              {`${time}일차`}
            </button>
          ))}
        </P.timeBtnBox>
        <P.planContentBox>
          {plan[`day${selectedTimeBtn}`].map((card, index) => (
            <div key={index} className="planCard">
              <P.planPlaceCard>
                <div className="contentBox">
                  {card.firstimage ? (
                    <img className="fit-picture" src={card.firstimage} alt="장소사진" />
                  ) : (
                    <img className="fit-picture" src={noImage} alt="이미지 없음" />
                  )}
                  <div className="discBox">
                    <h2>{card.title}</h2>
                    <p>{card.addr1}</p>
                  </div>
                </div>
                <input
                  className="planInput"
                  onChange={(e) => {
                    handlePlanTextChange(e, card.day, card.index);
                  }}
                  value={card.text}
                ></input>
              </P.planPlaceCard>
              <button
                className="cardDeleteBtn"
                value={planText}
                onClick={(e) => {
                  handleDeletePlan(e, card.day, card.index, card.contentid);
                }}
              >
                <img
                  className="deleteImage"
                  src="https://cdn-icons-png.flaticon.com/128/1214/1214428.png"
                  alt="삭제 버튼"
                />
              </button>
            </div>
          ))}
        </P.planContentBox>
      </P.planContainer>
    </>
  );
}

export default PlanAdd;

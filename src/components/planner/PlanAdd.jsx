import React, { useState } from 'react';
import * as P from './StyledPlanAdd';

function PlanAdd(plans) {
  const [selectedTimeBtn, setSelectedTimeBtn] = useState(1); // 선택된 timeBtn 상태 추가
  const timeButtons = [1, 2, 3, 4, 5];
  const planCards = [
    {
      name: '장소명1',
      info: '정보1',
      imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/13/53/woman-1870007_640.jpg'
    },
    {
      name: '장소명2',
      info: '정보2',
      imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/13/53/woman-1870007_640.jpg'
    },
    {
      name: '장소명3',
      info: '정보3',
      imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/13/53/woman-1870007_640.jpg'
    },
    {
      name: '장소명4',
      info: '정보4',
      imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/13/53/woman-1870007_640.jpg'
    },
    {
      name: '장소명5',
      info: '정보5',
      imgUrl: 'https://cdn.pixabay.com/photo/2016/11/29/13/53/woman-1870007_640.jpg'
    }
    // ... (다른 장소 카드들)
  ];
  const [planText, setPlanText] = useState('');

  const handleTimeBtnClick = (time) => {
    setSelectedTimeBtn(time); // 선택된 timeBtn 상태 업데이트
  };

  const handlePlanTextChange = (e) => {
    setPlanText(e.target.value); // 작성한 내용 업데이트
  };

  const handleAddBtnClick = () => {
    plans.handlePlanBox();
    setPlanText('');
    setSelectedTimeBtn(1);
  };

  return (
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
        {planCards.map(
          (card, index) =>
            selectedTimeBtn === index + 1 && (
              <div key={index} className="planCard">
                <P.planPlaceCard>
                  <div className="contentBox">
                    <img className="fit-picture" src={card.imgUrl} alt="장소사진" />
                    <div className="discBox">
                      <h2>{card.name}</h2>
                      <p>{card.info}</p>
                    </div>
                  </div>
                  <input className="planInput"></input>
                </P.planPlaceCard>
                <button className="cardDeleteBtn" value={planText} onChange={handlePlanTextChange}>
                  <img
                    className="deleteImage"
                    src="https://cdn-icons-png.flaticon.com/128/1214/1214428.png"
                    alt="삭제 버튼"
                  />
                </button>
              </div>
            )
        )}
      </P.planContentBox>
      <P.planAddBtn onClick={handleAddBtnClick}>작성하기</P.planAddBtn>
    </P.planContainer>
  );
}

export default PlanAdd;

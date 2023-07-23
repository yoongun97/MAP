import React, { useState } from 'react';
import { PV } from './StyledPlanView';

const PlanView = ({ closeModal, plan }) => {
  const [selectedTimeBtn, setSelectedTimeBtn] = useState(1);
  console.log(plan[0][`day${selectedTimeBtn}`]);
  // 일자 지정을 위한 배열
  const timeButtons = [1, 2, 3, 4, 5];

  // 일자 클릭
  const handleTimeBtnClick = (time) => {
    setSelectedTimeBtn(time);
  };
  return (
    <PV.Wrap
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="modal">
        <div className="time-btn-box">
          {timeButtons.map((time) => (
            <button
              key={time}
              className={`timeBtn ${selectedTimeBtn === time ? 'active' : ''}`}
              onClick={() => handleTimeBtnClick(time)}
            >
              {`${time}일차`}
            </button>
          ))}
          <button className="close-modal" onClick={closeModal}>
            닫기
          </button>
        </div>
        <div className="plan-content-box">
          {plan[0][`day${selectedTimeBtn}`]?.map((spot) => {
            return (
              <div key={spot.title} className="plan-card">
                <div className="plan-place-card">
                  <div className="content-box">
                    <img className="fit-picture" src={spot.firstimage} alt="장소사진" />
                    <div className="disc-box">
                      <h2>{spot.title}</h2>
                      <p>{spot.addr1 + spot.addr2}</p>
                    </div>
                  </div>
                  <div className="plan-content">{spot.text}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PV.Wrap>
  );
};

export default PlanView;

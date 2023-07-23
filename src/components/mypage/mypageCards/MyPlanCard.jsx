import React, { useState } from 'react';
import { MPC } from './StyledMyPlanCard';
import PlanView from '../modal/PlanView';
import { useQuery } from 'react-query';
import { fetchPlans } from '../../../api/plans';
import { ReactComponent as Spinner } from '../../../assets/Spinner.svg';
import { auth } from '../../../firebase';

const MyPlanCard = () => {
  const currentUser = auth.currentUser?.uid;
  // const currentUser = 'mq2ucY1KZsdi2YmtikgUCyZw8dN2';

  const { isLoading, data } = useQuery('detailData', () => fetchPlans(currentUser));
  const [isOpenPlanViewModal, setIsOpenPlanViewModal] = useState(false);
  const [detailData, setDetailData] = useState([]);
  const createDetailData = (filteringIdx) => {
    const filteredData = data.filter((_, idx) => idx === filteringIdx);
    setDetailData(filteredData);
  };
  window.addEventListener('click', () => {
    if (isOpenPlanViewModal) setIsOpenPlanViewModal(!isOpenPlanViewModal);
  });
  const handleModal = () => {
    setIsOpenPlanViewModal(!isOpenPlanViewModal);
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <MPC.Wrap $view={isOpenPlanViewModal}>
            {data?.map((plan, idx) => {
              return (
                <div key={idx} className="plancard-container" onClick={() => {}}>
                  <div className="img-div">
                    <img src={plan.day1[0].firstimage} alt="이미지"></img>
                  </div>
                  <div className="info-box">
                    <span>
                      {plan.title}
                      <p>{`작성일: 월 일`}</p>
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleModal();
                        createDetailData(idx);
                      }}
                    >
                      Click!
                    </button>
                  </div>
                </div>
              );
            })}
          </MPC.Wrap>
          {isOpenPlanViewModal && <PlanView closeModal={handleModal} plan={detailData} />}
        </>
      )}
    </>
  );
};

export default MyPlanCard;

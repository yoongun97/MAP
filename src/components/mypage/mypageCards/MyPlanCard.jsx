import React, { useState } from 'react';
import { MPC } from './StyledMyPlanCard';
import PlanView from '../modal/PlanView';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deletePlan, fetchPlans } from '../../../api/plans';
import { ReactComponent as Spinner } from '../../../assets/Spinner.svg';
import { auth } from '../../../firebase';
import planImg from '../../../assets/plan.png';

const MyPlanCard = () => {
  const currentUser = auth.currentUser?.uid;
  const queryClient = useQueryClient();
  const { isLoading, data } = useQuery('detailData', () => fetchPlans(currentUser));
  const deletePlanMutation = useMutation(deletePlan, {
    onSuccess: () => {
      queryClient.invalidateQueries('detailData');
    }
  });
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
  const handlePlanDeleteBtn = async (planId) => {
    deletePlanMutation.mutate(planId);
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <MPC.Wrap $view={isOpenPlanViewModal}>
            {data?.map((plan, idx) => {
              // img 찾기
              let imageUrl = '';

              for (let i = 1; i <= 5; i++) {
                let day = `day${i}`;
                let arr = plan[day];

                if (arr.length > 0) {
                  let img = arr.find((item) => item.firstimage);
                  if (img) {
                    imageUrl = img.firstimage;
                    break;
                  }
                }
              }

              return (
                <div key={idx} className="plancard-container" onClick={() => {}}>
                  <div className="img-div">
                    <img src={imageUrl ? imageUrl : planImg} alt="이미지"></img>
                  </div>
                  <div className="info-box">
                    <span>
                      {plan.title}
                      <p>{`${plan.createdAt}`}</p>
                    </span>
                    <button
                      className="view-plan-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleModal();
                        createDetailData(idx);
                      }}
                    >
                      Click!
                    </button>
                    <button
                      className="plan-delete-btn"
                      onClick={() => {
                        handlePlanDeleteBtn(plan.planId);
                      }}
                    >
                      x
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

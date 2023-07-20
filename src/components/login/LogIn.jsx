import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import {
  StHeaderBtn,
  StModal,
  StModalTitle,
  StModalSubTitle,
  StModalInput,
  StModalBtn,
  StSNSContainer,
  StSNSBtn,
  StSNSBtns,
  StModalTitleL,
  StModalTitleS,
  StWarnMent,
  StSNSTitle,
  StModalBtns
} from './StyledLogIn';

function LogIn({ openModal, closeModal, isLogInOpen, LogInModalRef }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  //모달 여닫기
  const openLogInModal = () => {
    openModal();
  };

  const closeLogInModal = () => {
    closeModal();
    setEmail('');
    setPassword('');
    setErrorMessage('');
  };

  // 로그인 버튼 클릭 시 이벤트
  const signIn = async (event) => {
    event.preventDefault();
    console.log('click signIn'); // 로그 확인을 위해 추가
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      alert('로그인 되었습니다.');

      closeLogInModal();
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/user-not-found') {
        setErrorMessage('이메일이 존재하지 않습니다.');
      } else if (error.code === 'auth/wrong-password') {
        setErrorMessage('비밀번호가 틀렸습니다.');
      } else {
        setErrorMessage('이메일 형식이 아닙니다.');
      }
    }
  };

  // 로그아웃 버튼 클릭 시 이벤트
  const signOutHandler = async () => {
    // alert('로그아웃 하시겠습니까?');
    await signOut(auth);
  };

  // email input
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  // password input
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    // 사용자의 로그인 상태 변경 감지
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user); // 로그인된 사용자의 데이터 설정정
      } else {
        setCurrentUser(null); // 로그인되지 않은 상태면 null로 설정
      }
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 이벤트 구독 해제
  }, []);

  // Enter 키 입력 감지
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      signIn(event);
    }
  };

  return (
    <>
      {currentUser ? (
        <StHeaderBtn onClick={signOutHandler}>로그아웃</StHeaderBtn>
      ) : (
        <StHeaderBtn onClick={openLogInModal}>로그인</StHeaderBtn>
      )}
      {isLogInOpen && (
        <StModal ref={LogInModalRef}>
          <StModalTitle>
            <StModalTitleL>LOG IN</StModalTitleL>
            <StModalTitleS>지역기반 여행 가이드</StModalTitleS>
          </StModalTitle>

          <StModalSubTitle>이메일</StModalSubTitle>
          <StModalInput type="email" value={email} onChange={emailChangeHandler}></StModalInput>

          <StModalSubTitle>비밀번호</StModalSubTitle>
          <StModalInput
            style={{ marginBottom: 0 }}
            type="password"
            value={password}
            onChange={passwordChangeHandler}
            onKeyDown={handleKeyDown}
          ></StModalInput>

          <StWarnMent>{errorMessage}</StWarnMent>
          <StModalBtns>
            <StModalBtn backgroundColor="#474688" onClick={signIn}>
              로그인
            </StModalBtn>
            <StModalBtn backgroundColor="#F55150" onClick={closeLogInModal}>
              뒤로가기
            </StModalBtn>
          </StModalBtns>
          <StSNSContainer>
            <StSNSTitle>SNS 간편 로그인</StSNSTitle>
            <StSNSBtns>
              <StSNSBtn
                className="fit-picture"
                src="https://i0.wp.com/forhappywomen.com/wp-content/uploads/2018/11/%EC%82%B0%EB%B6%80%EC%9D%B8%EA%B3%BC-%ED%8F%AC%ED%95%B4%ED%94%BC%EC%9A%B0%EB%A8%BC-%EB%AC%B8%EC%9D%98-%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%94%8C%EB%9F%AC%EC%8A%A4%EC%B9%9C%EA%B5%AC-%EB%B2%84%ED%8A%BC.png?w=586&ssl=1"
                alt="카카오"
              />

              <StSNSBtn
                className="fit-picture"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAmVBMVEX///8AvxgAvQDY9eJP2ISN4KIAvgQAwSPb+u7N9Nyq784AwR259NuW3JkAvhH8//9W0nIAwyslyUrz/vrB8tay5rhq25CG35276sLN9+VZ1X0AxDXr+/NHzmN725TB7s2B4qUgxj+h57Y0ylOx68Wq5LJ757KG5rK99d/i+e6n6b1m1oFr2YzJ89uY5bAzzV43xkNQ1Xlg0nJ9EnlhAAADxUlEQVR4nO3da1faQBCH8d1BA166GLFC5WaqvaACrd//w5WcQ6lo2GQWLTNz/s/7LPwOgTUx2TiHEEIIIYQQQgghhBBCqHHdq8/XR+LqD768k+/kJiOhDfujd/CNiYIXWiCa9PbzdftEh2bEo3y6F3As3OfLz/F2D2AhH7iKrpOFFyqAK+LXROCxEqAPWSsJ2MrE/oa+LrtLEmrZR8voPgHYUQT0oUgQTjQJPc35wlzNt7CMJmygqp10tZvyf2umyoRD9t/g35QJfYcrVDPdr+NP+hBKC0II5QchhPKDEEL5QQih/CCEUH4QQig/CCGUH4QQyg9CCOUH4X7CEL+CMLZp+pb/Uxja56eRbiMj0ffYlj8YxI8V5vGhIhfm0M/YhidihO34ULP2zss66NyE0D3sHMuKcPd+akbY27WfmhG6+x2j2RG6x+rhDAl7w8r91JDQXVWOZ0nonqoGNCXsFhX7qSmhm1fce2NLWHXVsTFhxX5qTFhx3bE14dtBzQnd8tWo9oStsP1VtCd0i+1hDQpf7acWhaOt+8UsCrdPaZgUbp3SsCkcvTilYVP48pSGUaG72YxtVdjb3PlnVfjvxjizws2pN7vCv4eKdoVuTtaF61NvloXuMrMunJd/gpsWuj5ZF7oisy7sUDAuXL2GdaFb2hBGFuOa2RB+irz24tSEMLYoR3Q1CzVCOua+uDphyvI4uoRh2DUu9PRoXZi2FpcqYThLWYZTk9DT0rrQp0wZuoSe+GsbKhOGgr1arDKhpyfrQk/c9XDVCQMx91N1Qk9j60JPC+tC5nK4CoU+KzhHGRqFvClDpZB1lKFTGPLmRxk6hZ4urAsZK6hrFQaaGRf67LLhlKFW2Hhpar1CT1fWhSFvdJShWNhwytAsbDZlqBYG32DKUC30dFc/ZegWeupbF3o6sS4Mw7opQ7uw/n9u6oWeHqwL66YMOcL46i27hXXPaRIj9P4sVvR9Rbc8YzzM54OFIVb6lpynFWElLAjlByGE8oMQQvlBCKH8IIRQfhBCKD8IIZQfhBDKD0II5QchhPLjCxfmhQNdwpB3uMLqNdTFFn5xga6bcf4De/DoN1sYezqMwGjAF041CUNg36C6qvp5DTLj359atuu5IgILWcrt/s6N1RCZ9zVu6nCu2Dlk9JwGLK+6UkGky5SfmTUxyw799uujprfgVBML6d/FQM/pn2BZ74kk76qB2jXXqDao9ZitkBJbva/8eL8PcN1ocHRXtKWVF8tJs9unmtXrSGu2z+8LQgghhBBCCCGEEEIIvekPP5Cn33NBThsAAAAASUVORK5CYII="
                alt="네이버"
              />
              <StSNSBtn
                className="fit-picture"
                src="data:image/png;base64,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"
                alt="구글"
              />
            </StSNSBtns>
          </StSNSContainer>
        </StModal>
      )}
    </>
  );
}

export default LogIn;

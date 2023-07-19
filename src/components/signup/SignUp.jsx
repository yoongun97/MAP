import React, { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, updateProfile } from 'firebase/auth';
import {
  StHeaderBtn,
  StModal,
  StModalTitle,
  StModalSubTitle,
  StModalInput,
  StModalBtns,
  StModalBtn,
  StModalTitleL,
  StModalTitleS,
  StInputContainer,
  StOverlapBtn,
  StWarnMent
} from './StyledSignUp';

function SignUp({ openModal, closeModal, isSignUpOpen }) {
  const [email, setEmail] = useState('');
  const [nickname, setNickName] = useState('');
  const [password, setPassword] = useState('');
  const [verifypassword, setVerifyPassword] = useState('');
  const [passwordverify, setPasswordVerify] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true); // 비밀번호 일치 여부 상태 추가
  const [showPasswordMismatch, setShowPasswordMismatch] = useState(false); // 비밀번호 불일치 메시지 표시 여부 상태 추가

  // 모달 여닫기
  const openSignUpModal = () => {
    openModal();
  };

  const closeSignUpModal = () => {
    closeModal();
    setEmail('');
    setPassword('');
    setVerifyPassword('');
    setPasswordVerify(true);
    setNickName('');
    setPasswordMatch(true);
    setShowPasswordMismatch(false);
  };

  // 회원가입 버튼 클릭 시 이벤트
  const signUp = async (event) => {
    event.preventDefault();
    if (email.trim() === '' || password.trim() === '' || verifypassword.trim() === '') {
      alert('입력창을 전부 입력해 주세요!');
      return;
    }
    if (!passwordMatch) {
      setShowPasswordMismatch(true); // 비밀번호 불일치 메시지 표시
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: nickname }); // 닉네임 업데이트

      console.log(userCredential);
      // console.log('가입된 닉네임:', userCredential.user.displayName); // 닉네임 출력
      alert('가입되었습니다.');
      closeSignUpModal();
    } catch (error) {
      console.error(error);
    }
  };

  // email input
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  // 닉네임 input
  const nicknameChangeHandler = (event) => {
    setNickName(event.target.value);
  };

  // 비밀번호 input
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
    setPasswordVerify(event.target.value.length < 6 && event.target.value.length !== 0);
    setPasswordMatch(event.target.value === verifypassword); // 비밀번호 일치 여부 업데이트
  };

  // 비밀번호 확인 input
  const verifypasswordChangeHandler = (event) => {
    setVerifyPassword(event.target.value);
    setPasswordMatch(password === event.target.value); // 비밀번호 일치 여부 업데이트
  };

  // email 중복확인
  const verifyEmailHandler = async (event) => {
    event.preventDefault();
    if (email.trim() === '') {
      alert('이메일을 입력해 주세요!');
      return;
    }
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        // 이미 존재하는 이메일
        alert('이미 존재하는 이메일입니다.');
      } else {
        // 사용 가능한 이메일
        alert('사용할 수 있는 이메일입니다!');
      }
    } catch (error) {
      alert('이메일 확인에 실패했습니다!');
      console.log('이메일 확인 실패', error.code, error.message);
    }
  };

  // 닉네임 중복 확인
  const verifyNicknameHandler = async (event) => {
    event.preventDefault();
    if (nickname.trim() === '') {
      alert('닉네임을 입력해 주세요!');
      return;
    }

    try {
      // const user = auth.currentUser;
      // if (user) {
      //   // 현재 사용자의 닉네임을 변경할 경우, 자기 자신을 제외하고 중복 확인
      //   const { displayName } = user;
      //   if (displayName === nickname) {
      //     alert('사용 가능한 닉네임입니다!');
      //     return;
      //   }
      // }

      // 닉네임이 이미 존재하는지 확인
      const domain = 'firebaseapp.com'; // Firebase Authentication에서 사용하는 도메인
      const email = `${nickname}@${domain}`;

      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        // 이미 존재하는 닉네임
        alert('이미 존재하는 닉네임입니다.');
      } else {
        // 사용 가능한 닉네임
        alert('사용할 수 있는 닉네임입니다!');
      }
    } catch (error) {
      alert('닉네임 확인에 실패했습니다!');
      console.log('닉네임 확인 실패', error);
    }
  };

  return (
    <>
      <StHeaderBtn onClick={openSignUpModal}>회원가입</StHeaderBtn>
      {isSignUpOpen && (
        <StModal>
          <StModalTitle>
            <StModalTitleL>SIGN UP</StModalTitleL>
            <StModalTitleS>지역기반 여행 가이드</StModalTitleS>
          </StModalTitle>

          <StModalSubTitle>이메일</StModalSubTitle>
          <StInputContainer>
            <StModalInput type="email" value={email} onChange={emailChangeHandler} />
            <StOverlapBtn onClick={verifyEmailHandler}>중복 확인</StOverlapBtn>
          </StInputContainer>
          <StModalSubTitle>닉네임</StModalSubTitle>
          <StInputContainer>
            <StModalInput type="text" value={nickname} onChange={nicknameChangeHandler} />
            <StOverlapBtn onClick={verifyNicknameHandler}>중복 확인</StOverlapBtn>
          </StInputContainer>

          <StModalSubTitle>비밀번호</StModalSubTitle>
          <StModalInput
            style={{ marginBottom: '5px' }}
            type="password"
            value={password}
            onChange={passwordChangeHandler}
          />
          {passwordverify && password && (
            <StWarnMent invalid={passwordverify ? 'true' : undefined}>비밀번호는 6자리 이상이어야 합니다.</StWarnMent>
          )}

          <StModalSubTitle>비밀번호 확인</StModalSubTitle>
          <StModalInput
            style={{ marginBottom: '5px' }}
            type="password"
            value={verifypassword}
            onChange={verifypasswordChangeHandler}
          />
          {showPasswordMismatch && <StWarnMent>비밀번호가 일치하지 않습니다.</StWarnMent>}
          <StModalBtns>
            <StModalBtn backgroundColor="#474688" onClick={signUp}>
              회원가입
            </StModalBtn>
            <StModalBtn backgroundColor="#F55150" onClick={closeSignUpModal}>
              뒤로가기
            </StModalBtn>
          </StModalBtns>
        </StModal>
      )}
    </>
  );
}

export default SignUp;

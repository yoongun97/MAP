import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, onAuthStateChanged } from 'firebase/auth';
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
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, query, where, getFirestore, getDocs } from 'firebase/firestore';

function SignUp({ openModal, closeModal, isSignUpOpen, SignUpModalRef }) {
  const [email, setEmail] = useState('');
  const [nickname, setNickName] = useState('');
  const [password, setPassword] = useState('');
  const [verifypassword, setVerifyPassword] = useState('');
  const [passwordverify, setPasswordVerify] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true); // 비밀번호 일치 여부 상태 추가
  const [showPasswordMismatch, setShowPasswordMismatch] = useState(false); // 비밀번호 불일치 메시지 표시 여부 상태 추가
  const [currentUser, setCurrentUser] = useState(null); // 현재 로그인된 사용자 닉네임 상태 추가
  const navigate = useNavigate();

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

      alert('가입되었습니다.');

      const uid = userCredential.user.uid;

      await addDoc(collection(db, 'users'), {
        uid: uid,
        email: email,
        nickname: nickname
      });

      // 회원가입 완료 후 사용자의 로그인 상태 변경
      setCurrentUser(nickname);

      closeSignUpModal();
    } catch (error) {
      alert('가입에 실패했습니다!');

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
      const db = getFirestore();
      const usersCollectionRef = collection(db, 'users');
      const q = query(usersCollectionRef, where('nickname', '==', nickname));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // 이미 존재하는 닉네임입니다
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

  useEffect(() => {
    // 사용자의 로그인 상태 변경 감지
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // 로그인된 사용자의 uid로 users 컬렉션에서 해당 사용자의 정보를 가져옴
        try {
          const usersRef = collection(db, 'users');
          const querySnapshot = await getDocs(query(usersRef, where('uid', '==', user.uid)));

          if (!querySnapshot.empty) {
            // 해당 사용자의 정보를 찾으면 닉네임을 가져와서 setCurrentUser로 설정
            querySnapshot.forEach((doc) => {
              setCurrentUser(doc.data().nickname);
            });
          }
        } catch (error) {
          console.log('사용자 정보를 가져오는 데 실패했습니다:', error);
        }
      } else {
        setCurrentUser(null); // 로그인되지 않은 상태면 null로 설정
      }
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 이벤트 구독 해제
  }, []);

  return (
    <>
      {currentUser ? (
        // 로그인된 사용자 닉네임이 있으면 표시
        <StHeaderBtn
          onClick={() => {
            navigate(`/mypage/${auth.currentUser.uid}`);
          }}
        >
          {currentUser}
        </StHeaderBtn>
      ) : (
        // 로그인되지 않은 경우 회원가입 버튼 표시
        <StHeaderBtn onClick={openSignUpModal}>회원가입</StHeaderBtn>
      )}
      {isSignUpOpen && (
        <StModal ref={SignUpModalRef}>
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

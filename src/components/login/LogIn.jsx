import React, { useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
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
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';

function LogIn({ openModal, closeModal, isLogInOpen, LogInModalRef }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const params = useParams();

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
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      closeLogInModal();
    } catch (error) {
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
    if (params.uid) {
      navigate('/list');
    }
  };

  // email input
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  // password input
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  // Google 로그인
  const LogInByGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const { email, uid, displayName } = user;
        const userDocRef = doc(db, 'users', uid); // 해당 유저의 문서 참조
        getDoc(userDocRef)
          .then((docSnapshot) => {
            if (!docSnapshot.exists()) {
              // 데이터가 없는 경우에만 초기값으로 설정
              const nickname = displayName;

              setDoc(
                userDocRef,
                {
                  email: email,
                  nickname: nickname,
                  uid: uid
                },
                { merge: true }
              );
            }
          })
          .catch((error) => {
            console.log(error);
          });
        closeLogInModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Github 로그인
  const LogInByGithub = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const { email, uid } = user;
        const userDocRef = doc(db, 'users', uid); // 해당 유저의 문서 참조
        getDoc(userDocRef)
          .then((docSnapshot) => {
            if (!docSnapshot.exists()) {
              // 데이터가 없는 경우에만 초기값으로 설정
              const nickname = email;

              setDoc(
                userDocRef,
                {
                  email: email,
                  nickname: nickname,
                  uid: uid
                },
                { merge: true }
              );
            }
          })
          .catch((error) => {
            console.log(error);
          });
        closeLogInModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // KaKao 로그인
  // useEffect(() => {
  //   if (!window.Kakao.isInitialized()) {
  //     window.Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
  //   }
  // }, []);

  const LogInByKaKao = () => {
    const redirectUri = `http://localhost:3000/callback/kakaotalk`;
    const scope = 'profile_nickname,account_email'; // 수정된 스코프 값

    window.Kakao.Auth.authorize({
      redirectUri,
      scope
    });

    const location = useLocation(); // useLocation 훅 사용

    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get('code');

      if (!code) {
        // code가 없을 때 리스트 화면으로 이동
        return <Navigate to="/list" />;
      } else {
        // code가 있을 때 처리할 로직 작성
        // 예: 로그인 처리 등
      }
    }, [location]);

    return null;
  };

  // 사용자의 로그인 상태 변경 감지
  useEffect(() => {
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
            <StModalBtn $backgroundColor="#474688" onClick={signIn}>
              로그인
            </StModalBtn>
            <StModalBtn $backgroundColor="#F55150" onClick={closeLogInModal}>
              뒤로가기
            </StModalBtn>
          </StModalBtns>
          <StSNSContainer>
            <StSNSTitle>SNS 간편 로그인</StSNSTitle>
            <StSNSBtns>
              <StSNSBtn
                className="fit-picture"
                src="data:image/png;base64,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"
                alt="구글"
                onClick={LogInByGoogle}
                style={{ width: '40px', height: '40px' }}
              />
              <StSNSBtn
                className="fit-picture"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6l6p1-u8laWPIJvDhqG8c6gq9Ms9o-ajc0g&usqp=CAU"
                alt="깃허브"
                onClick={LogInByGithub}
              />

              <StSNSBtn
                className="fit-picture"
                src="data:image/png;base64,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"
                alt="카카오"
                onClick={LogInByKaKao}
              />
            </StSNSBtns>
          </StSNSContainer>
        </StModal>
      )}
    </>
  );
}

export default LogIn;

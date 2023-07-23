// KakaoLogin.js

import React from 'react';
import { StSNSBtn } from './StyledLogIn';

const KakaoLogin = () => {
  const CLIENT_ID = `${process.env.REACT_APP_REST_API_KEY}`;
  const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URL}`;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <StSNSBtn
      className="fit-picture"
      alt="카카오 로그인"
      src="data:image/png;base64,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"
      onClick={() => (window.location.href = kakaoURL)}
    />
  );
};

export default KakaoLogin;
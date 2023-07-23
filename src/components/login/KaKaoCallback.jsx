import React, { useEffect } from 'react';
import axios from 'axios';
import { doc, setDoc, getDoc } from '@firebase/firestore';
import { db } from '../../firebase';

const KakaoCallback = () => {
  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get('code');
    const grantType = 'authorization_code';
    const REST_API_KEY = `${process.env.REACT_APP_REST_API_KEY}`;
    const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URL}`;

    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
        {},
        { headers: { 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' } }
      )
      .then((res) => {
        console.log(res);
        const { access_token } = res.data;
        axios
          .post(
            `https://kapi.kakao.com/v2/user/me`,
            {},
            {
              headers: {
                Authorization: `Bearer ${access_token}`
              }
            }
          )
          .then((res) => {
            console.log('2번째', res.data);
            const user = res.data;
            const displayName = user.properties.nickname;
            const uid = user.id;
            const email = user.kakao_account.email;

            const userDocRef = doc(db, 'users', String(uid)); // 해당 유저의 문서 참조
            getDoc(userDocRef)
              .then((docSnapshot) => {
                if (!docSnapshot.exists()) {
                  // 데이터가 없는 경우에만 초기값으로 설정

                  setDoc(
                    userDocRef,
                    {
                      email: email,
                      nickname: displayName,
                      uid: uid
                    },
                    { merge: true }
                  );
                }
              })
              .catch((error) => {
                console.log(error);
              });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <></>;
};

export default KakaoCallback;

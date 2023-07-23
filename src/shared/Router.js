import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from '../common/Layout';
import MainPage from '../pages/MainPage';
import MyPage from '../pages/MyPage';
import DetailPage from '../pages/DetailPage';
import ListPage from '../pages/ListPage';
import KakaoCallback from '../components/login/KaKaoCallback';

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route element={<Layout />}>
          <Route path="/list" element={<ListPage />} />
          <Route path="/:placeId" element={<DetailPage />} />
          <Route path="/mypage/:uid" element={<MyPage />} />
          <Route path="/callback/kakaotalk" element={<KakaoCallback />} />
        </Route>
      </Routes>
    </>
  );
}

export default Router;

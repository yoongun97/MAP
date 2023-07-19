import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from '../common/Layout';
import Main from '../pages/Main';
import MyPage from '../pages/MyPage';
import Likes from '../components/like/Likes';
import DetailPage from '../pages/DetailPage';

function Router() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route element={<Layout />}>
          <Route path="/feat/likes" element={<Likes />} />
          <Route path="/Detail" element={<DetailPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default Router;

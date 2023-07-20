import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from '../common/Layout';
import MainPage from '../pages/MainPage';
import MyPage from '../pages/MyPage';
import DetailPage from '../pages/DetailPage';
import ListPage from '../pages/ListPage';

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route element={<Layout />}>
          <Route path="/list" element={<ListPage />} />
          <Route path="/Detail" element={<DetailPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default Router;

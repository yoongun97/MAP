import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from '../common/Layout';
import Main from '../pages/Main';
import MyPage from '../pages/MyPage';
import DetailPage from '../pages/DetailPage';
import ListPage from '../pages/ListPage';

function Router() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Main />} />
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

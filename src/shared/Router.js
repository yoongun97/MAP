import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../common/Layout';
import Main from '../pages/Main';
import MyPage from '../pages/MyPage';

function Router() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default Router;

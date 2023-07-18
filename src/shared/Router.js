import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import Likes from '../components/like/Likes';
import DetailPage from '../pages/DetailPage';
function Router() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/feat/likes" element={<Likes />} />
        <Route path="/Detail" element={<DetailPage />} />
      </Routes>
    </>
  );
}

export default Router;

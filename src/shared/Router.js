import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import DetailPage from '../pages/DetailPage';
import ListPage from '../pages/ListPage';
function Router() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/Detail" element={<DetailPage />} />
      </Routes>
    </>
  );
}

export default Router;

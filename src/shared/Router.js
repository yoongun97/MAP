import React from 'react';
import { Route, Routes } from 'react-router-dom';

function Router() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </>
  );
}

export default Router;

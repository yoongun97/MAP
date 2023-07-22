import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/config/configStore';

// const functions = require('firebase-functions');
// const express = require('express');
// const cors = require('cors');

// const app = express();
// app.use(cors({ origin: true }));

// app.post('/kakao', async (req, res) => {
//   // TODO: API 구현하기
// });

// exports.auth = functions.https.onRequest(app);

// resolve.fallback = { crypto: require.resolve('crypto-browserify') };
// resolve.fallback = { crypto: false };

// const axios = require('axios');
// require('dotenv').config();

// const getToken = async (code) => {
//   const body = {
//     grant_type: 'authorization_code',
//     client_id: process.env.KAKAO_REST_API_KEY || '',
//     redirect_uri: process.env.KAKAO_REDIRECT_URI || '',
//     code
//   };

//   const res = await axios.post('https://kauth.kakao.com/oauth/token', new URLSearchParams(body));
//   return res.data;
// };

// app.post('/kakao', async (req, res) => {
//   const { code } = req.body;

//   if (!code) {
//     return res.status(400).json({
//       code: 400,
//       message: 'code is a required parameter.'
//     });
//   }

//   const response = await getToken(code);
//   const token = response.access_token;
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

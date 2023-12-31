import axios from 'axios';

const instance = axios.create({
  baseURL: `https://apis.data.go.kr/B551011/KorService1`,
  withCredentials: false,
  timeout: 100000000
});

instance.interceptors.request.use(
  (config) => {
    // 개발 시 확인용
    // const { url, method, params, data } = config;
    return config;
  },
  (error) => {
    // 개발 시 확인용
    // console.log(`"[요청에러]"+${error}`);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // 개발 시 확인용
    // console.log(`[응답데이터]: ${JSON.stringify(response.data, null, 2)}`);
    return response;
  },
  (error) => {
    // 개발 시 확인용
    // console.log(`"[응답에러]"+${error}`);
    return Promise.reject(error);
  }
);

export default instance;

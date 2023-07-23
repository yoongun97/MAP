import { useState, useCallback } from 'react';

// 디바운싱 커스텀 훅을 정의합니다.
export default function useDebouce(callback, delay) {
  // 타이머 ID를 상태로 관리하기 위한 useState .
  const [timerId, setTimerId] = useState(null);

  // 디바운싱된 콜백 함수를 useCallback 훅을 사용하여 메모이제이션.
  const debouncedCallback = useCallback(
    (...args) => {
      // 콜백 함수가 호출될 때마다 실행되는 함수.
      if (timerId) {
        // 이전에 타이머가 설정되어 있다면, 새로운 콜백 호출이 발생했다는 의미.
        // 이전 타이머를 취소하여 중복 호출을 방지.
        clearTimeout(timerId);
      }

      // 일정 시간(delay)이 지난 후에 콜백 함수를 실행하기 위해 setTimeout을 설정.
      const newTimerId = setTimeout(() => {
        // 지정된 delay 시간이 지난 후에 콜백 함수를 실행.
        // apply 메서드를 사용하여 콜백 함수를 실행하는 이유는, 콜백 함수의 인자를 전달하기 위함.
        callback.apply(this, args);
      }, delay);

      // setTimeout으로 설정한 새로운 타이머 ID를 상태로 저장.
      setTimerId(newTimerId);
    },
    [callback, delay, timerId]
  ); // 콜백, delay, timerId가 변경될 때마다 새로운 콜백 함수를 생성.

  // 디바운싱된 콜백 함수를 반환.
  return debouncedCallback;
}

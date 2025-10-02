import { useEffect, useState } from 'react';

// 현재 경로 가져오기
export const getCurrentPath = () => window.location.pathname;

// 경로 이동
export const navigateTo = (path: string) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate')); // 라우트 변경 알림
};

// 경로 감지 훅
export const useCurrentPath = () => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return path;
};

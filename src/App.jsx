import { Reset } from 'styled-reset';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './shared/Router';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from './firebase';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false // 화면 밖으로 이동되었다가 다시 포커싱되었을 시 fetching하는것 막음.
    }
  }
});

function App() {
  const [, setUser] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.uid);
      } else setUser('');
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Reset />
      <Router />
    </QueryClientProvider>
  );
}

export default App;

import { Reset } from 'styled-reset';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './shared/Router';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false // 화면 밖으로 이동되었다가 다시 포커싱되었을 시 fetching하는것 막음.
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Reset />
      <Router />
    </QueryClientProvider>
  );
}

export default App;

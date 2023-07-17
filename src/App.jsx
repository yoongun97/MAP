import { Reset } from 'styled-reset';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './shared/Router';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Reset />
      <Router />
    </QueryClientProvider>
  );
}

export default App;

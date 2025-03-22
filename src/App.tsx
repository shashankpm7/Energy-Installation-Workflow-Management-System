import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import { store } from './store/store';
import { AppRoutes } from './routes';
import { Sidebar } from './components/layout/sidebar';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
          <div className="w-64 flex-shrink-0">
            <Sidebar />
          </div>
          <div className="flex-1 overflow-auto">
            <AppRoutes />
          </div>
        </div>
        <Toaster position="top-right" />
      </Router>
    </Provider>
  );
}

export default App;
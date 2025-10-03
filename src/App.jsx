// src/App.jsx
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Pages
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import PopularPage from './pages/PopularPage';
import AdminPage from './pages/AdminPage';
import SubmissionsPage from './pages/SubmissionsPage';
import SubmitPage from './pages/SubmitPage';

// Components
import Header from './components/Header';
import NotFound from './components/NotFound';

// Styles
import GlobalStyles from './styles/GlobalStyles';

// React Query Client 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <GlobalStyles />
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/list" element={<ListPage />} />
              <Route path="/restaurant/:id" element={<DetailPage />} />
              <Route path="/popular" element={<PopularPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/submissions" element={<SubmissionsPage />} />
              <Route path="/submit" element={<SubmitPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <footer className="footer">
            <p>© 2025 Ajou Campus Foodmap | Made with React</p>
          </footer>
        </div>
        <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </HashRouter>
    </QueryClientProvider>
  );
}

export default App;
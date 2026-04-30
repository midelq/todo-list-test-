import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import Layout from './components/Layout/Layout';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import TasksPage from './pages/TasksPage/TasksPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  return !token ? <>{children}</> : <Navigate to="/tasks" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="/tasks" replace />} />
        <Route path="tasks" element={<TasksPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/tasks" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

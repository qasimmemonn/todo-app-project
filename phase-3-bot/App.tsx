
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { storage } from './services/storage';
import { User, AuthState, AppRoute } from './types';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionUser = storage.get<User>('session_user');
    if (sessionUser) {
      setAuth({ user: sessionUser, isAuthenticated: true });
    }
    setLoading(false);
  }, []);

  const handleLogin = (user: User) => {
    storage.set('session_user', user);
    setAuth({ user, isAuthenticated: true });
    navigate(AppRoute.DASHBOARD);
  };

  const handleLogout = () => {
    storage.remove('session_user');
    setAuth({ user: null, isAuthenticated: false });
    navigate(AppRoute.LOGIN);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path={AppRoute.LANDING} element={!auth.isAuthenticated ? <Landing /> : <Navigate to={AppRoute.DASHBOARD} />} />
        <Route path={AppRoute.LOGIN} element={<Login onLogin={handleLogin} />} />
        <Route path={AppRoute.SIGNUP} element={<Signup onLogin={handleLogin} />} />
        <Route path={AppRoute.PRIVACY} element={<Privacy />} />
        <Route path={AppRoute.TERMS} element={<Terms />} />
        <Route 
          path={AppRoute.DASHBOARD} 
          element={
            auth.isAuthenticated && auth.user ? (
              <Dashboard user={auth.user} onLogout={handleLogout} />
            ) : (
              <Navigate to={AppRoute.LOGIN} />
            )
          } 
        />
      </Routes>
    </div>
  );
};

export default App;

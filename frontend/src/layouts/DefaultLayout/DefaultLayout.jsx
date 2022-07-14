import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../layouts/components/Header';

function DefaultLayout({ children }) {
  const navigate = useNavigate();
  const logout = useCallback(() => {
    sessionStorage.removeItem('token');
    navigate('/creator');
    return () => {
      localStorage.removeItem('logout');
    };
  }, [navigate]);
  useEffect(() => {
    const handleInvalidToken = (e) => {
      console.log('🚀 ~ file: DefaultLayout.jsx ~ line 22 ~ handleInvalidToken ~ e', e);
      if (e.key === 'logout' && parseInt(e.newValue, 10) < Date.now()) {
        logout();
      }
    };

    window.addEventListener('storage', handleInvalidToken);
    return () => {
      window.removeEventListener('storage', handleInvalidToken);
    };
  }, [logout]);
  return (
    <div className="container">
      <Header />
      <div className="is-primary">{children}</div>
    </div>
  );
}
export default DefaultLayout;

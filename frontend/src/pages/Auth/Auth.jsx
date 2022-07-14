import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
export default function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies] = useCookies();
  useEffect(() => {
    if (!cookies.accessToken) {
      navigate('/error');
    }

    sessionStorage.setItem('token', JSON.stringify(cookies.accessToken));
  }, [cookies, navigate, dispatch]);

  return <div>Auth success</div>;
}

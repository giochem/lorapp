import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import routes from '../../../config/routes';
export default function Header() {
  const navigate = useNavigate();
  const user = sessionStorage.getItem('token');
  const [mobileNav, setMobileNav] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setMobileNav(!mobileNav);
  };
  const onLogoutMultiplePage = () => {
    window.localStorage.setItem('logout', Date.now());
    navigate('/creator');
    localStorage.removeItem('logout');
    sessionStorage.removeItem('token');
    console.log('local::', localStorage.getItem('logout'), 'session:: ', sessionStorage.getItem('token'));
  };
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        {/* <a className="navbar-item" href="https://bulma.io">
          {/* <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="logo" /> */}
        <button className="button is-white">Alpha test</button>
        <div className="navbar-burger" data-target="navbarBasicExample" onClick={handleClick}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className={mobileNav === true ? 'navbar-menu is-active ' : 'navbar-menu'}>
        <div className="navbar-start">
          <Link to={routes.home} className="navbar-item">
            Home
          </Link>
          <Link to={routes.creator} className="navbar-item">
            Creator
          </Link>
          <Link to={routes.store} className="navbar-item">
            Store
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {user ? (
                <button className="button is-primary" onClick={onLogoutMultiplePage}>
                  Logout
                </button>
              ) : (
                <>
                  <Link to={routes.login} className="button is-primary">
                    <strong>Sign up</strong>
                  </Link>
                  <Link to={routes.register} className="button is-light">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

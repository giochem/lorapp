import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import routes from '../../../config/routes';
import { logout } from '../../../reducers/user.reducer';
export default function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user) || {};
  const [mobileNav, setMobileNav] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setMobileNav(!mobileNav);
  };
  const onLogout = () => {
    console.log('logout');
    dispatch(logout());
  };
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
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
                <button className="button is-primary" onClick={onLogout}>
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

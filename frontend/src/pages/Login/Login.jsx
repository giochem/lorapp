import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../../reducers/user.reducer';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.user) || {};
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  useEffect(() => {
    if (isError) {
      console.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }
    return () => {
      dispatch(reset());
    };
  }, [user, isError, isSuccess, message, navigate, dispatch]);
  // const authGoogle = async () => {
  //   try {
  //     window.open('/api/v2/auth/google', '_self');
  //   } catch (error) {
  //     console.log('🚀 ~ file: Login.jsx ~ line 51 ~ authGoogle ~ error', error);
  //   }
  // };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  return (
    <>
      {!isLoading && (
        <section className="hero is-success is-fullheight">
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="column is-4 is-offset-4">
                <h3 className="title has-text-black">Login</h3>
                <hr className="login-hr" />
                <p className="subtitle has-text-black">Please login to proceed.</p>
                <div className="box">
                  <section className="form">
                    <form onSubmit={onSubmit}>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={email}
                          placeholder="Enter your email"
                          onChange={onChange}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          value={password}
                          placeholder="Enter password"
                          onChange={onChange}
                        />
                      </div>

                      <div className="form-group">
                        <button type="submit" className="btn btn-block">
                          Submit
                        </button>
                      </div>
                    </form>
                  </section>
                  {/* <button className="button is-block is-info is-large is-fullwidth" onClick={authGoogle}>
                  Google
                </button> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

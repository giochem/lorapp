import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { register, reset } from '../../reducers/user.reducer';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = formData;
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.user);
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (isSuccess || user) {
      navigate('/');
    }
    return () => {
      dispatch(reset());
    };
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
    };
    dispatch(register(newUser));
  };
  return (
    <>
      {!isLoading && (
        <section className="hero is-success is-fullheight">
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="column is-4 is-offset-4">
                <h3 className="title has-text-black">Register</h3>
                <hr className="login-hr" />
                <p className="subtitle has-text-black">Please register to proceed.</p>
                <div className="box">
                  <form onSubmit={handleSubmit}>
                    <div className="field">
                      <div className="control">
                        <input
                          value={name}
                          onChange={onChange}
                          name="name"
                          className="input is-large"
                          type="text"
                          placeholder="Your Name"
                          autoFocus=""
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <input
                          value={email}
                          onChange={onChange}
                          name="email"
                          className="input is-large"
                          type="email"
                          placeholder="Your Email"
                          autoFocus=""
                        />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <input
                          value={password}
                          onChange={onChange}
                          name="password"
                          className="input is-large"
                          type="password"
                          placeholder="Your Password"
                        />
                      </div>
                    </div>
                    <button className="button is-block is-info is-large is-fullwidth">Register</button>
                  </form>
                </div>
                {/* <p className="has-text-grey">
              <a href="../">Sign Up</a> &nbsp;·&nbsp;
              <a href="../">Forgot Password</a> &nbsp;·&nbsp;
              <a href="../">Need Help?</a>
            </p> */}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default function Login() {
  const authGoogle = async () => {
    try {
      window.open('/api/v2/auth/google', '_self');
    } catch (error) {
      console.log('🚀 ~ file: Login.jsx ~ line 51 ~ authGoogle ~ error', error);
    }
  };
  return (
    <>
      <section className="hero is-success is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">
              <h3 className="title has-text-black">Login</h3>
              <hr className="login-hr" />
              <p className="subtitle has-text-black">Please login to proceed.</p>
              {/* <button onClick={getData}>get DATA fake</button> */}
              <div className="box">
                <button className="button is-block is-info is-large is-fullwidth" onClick={authGoogle}>
                  Google
                </button>
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
    </>
  );
}

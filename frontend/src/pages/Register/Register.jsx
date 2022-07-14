export default function Register() {
  const authGoogle = () => {
    window.open('/api/v2/auth/google', '_self');
  };
  return (
    <>
      <section className="hero is-success is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">
              <h3 className="title has-text-black">Register</h3>
              <hr className="login-hr" />
              <p className="subtitle has-text-black">Please register to proceed...</p>
              <div className="box">
                <button className="button is-block is-info is-large is-fullwidth" onClick={authGoogle}>
                  Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

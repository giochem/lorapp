export default function Login() {
  // developer v2
  const authGoogle = async () => {
    try {
      window.open('http://localhost:8080/api/v2/auth/google', '_self');
    } catch (error) {
      console.log('🚀 ~ file: Login.jsx ~ line 51 ~ authGoogle ~ error', error);
    }
  };
  // const getData = async () => {
  //   try {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`,
  //       },
  //     };
  //     const dataFake = await axios.get('/api/v2/auth/test-token', config);
  //     console.log('🚀 ~ file: Login.jsx ~ line 61 ~ getData ~ dataFake', dataFake);
  //     if (dataFake.data.accessToken) {
  //       sessionStorage.setItem('token', JSON.stringify(dataFake.data.accessToken));
  //     }
  //     console.warn('🚀 ~ file: Login.jsx ~ line 56 ~ getData ~ dataFake', dataFake.data);
  //   } catch (error) {
  //     console.log('🚀 ~ file: Login.jsx ~ line 62 ~ getData ~ error', error);
  //   }
  // };
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

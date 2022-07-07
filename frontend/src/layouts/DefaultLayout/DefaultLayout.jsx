import Header from '../../layouts/components/Header';

function DefaultLayout({ children }) {
  return (
    <div className="container">
      <Header />
      <div className="is-primary">{children}</div>
    </div>
  );
}
export default DefaultLayout;

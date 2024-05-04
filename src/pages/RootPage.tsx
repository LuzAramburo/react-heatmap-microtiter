import { Link, Outlet } from 'react-router-dom';

function RootPage() {
  return (
    <div>
      <nav>
        <Link to="/">Data Loading</Link>
        <Link to="/visualization">Data Visualization</Link>
      </nav>
      <Outlet />
    </div>
  );
}
export default RootPage;

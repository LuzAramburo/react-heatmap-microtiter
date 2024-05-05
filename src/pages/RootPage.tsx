import { NavLink, Outlet } from 'react-router-dom';
import classes from './RootPage.module.css';

function RootPage() {
  return (
    <>
      <nav className={classes.nav}>
        <NavLink to="/"
          className={({ isActive }) => isActive ? classes.active : ''}
        >Data Loading</NavLink>
        <NavLink to="/visualization"
          className={({ isActive }) => isActive ? classes.active : ''}
        >Data Visualization</NavLink>
      </nav>
      <Outlet />
    </>
  );
}
export default RootPage;

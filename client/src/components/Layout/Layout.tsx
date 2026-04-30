import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './Layout.module.css';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <h2 className={styles.logo}>TaskFlow</h2>
          <div className={styles.userSection}>
            <span className={styles.userName}>{user?.name}</span>
            <button onClick={handleLogout} className={styles.logoutBtn}>
              Log out
            </button>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

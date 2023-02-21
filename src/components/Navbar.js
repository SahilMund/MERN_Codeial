import { Link } from 'react-router-dom';

import styles from '../styles/navbar.module.css';
import { useAuth } from '../hooks';
import {Avatar} from '../assests';


const Navbar = () => {
  // useAuth is a custom hook, which we are using to access the context  details
  const auth = useAuth();

  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </Link>
      </div>

      <div className={styles.rightNav}>
        {/* If user is present/loggedIn then show the user's dp and the name */}
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
                src={Avatar}
                alt=""
                className={styles.userDp}
              />
            </Link>
            <span>{auth.user.name}</span>
          </div>
        )}

        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <>
                <li onClick={auth.logout}>Log out</li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Log in</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

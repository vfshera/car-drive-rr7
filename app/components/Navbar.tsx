import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import logo from "~/assets/images/cardrive.png";
import type { User } from "better-auth";

type NavbarProps = {
  user?: User;
};

export default function Navbar({ user }: NavbarProps) {
  const location = useLocation();
  // const dispatch = useDispatch();

  const [sessionTimer, setTimer] = useState(0);

  const [menuOpen, setMenuOpen] = useState(false);

  const [toggleClasses, setToggleClasses] = useState("ti-menu");

  // const authUser = useSelector((state) => state.authUser);
  // const { auth, loggedInUser, loading } = authUser;

  // const userTime = useSelector((state) => state.userTime);

  useEffect(() => {
    if (menuOpen) {
      setToggleClasses("ti-close menu-opened");
    } else {
      setToggleClasses("ti-menu");
    }
  }, [menuOpen]);

  const logout = (e: React.MouseEvent) => {
    e.preventDefault();

    // dispatch(logoutUser());
  };

  return (
    <div
      className={`navbar-wrapper car-drive-container ${
        user ? "user-logged-in" : ""
      } ${menuOpen ? "mobile-nav" : "normal-nav"}`}
    >
      <div className="branding">
        <Link to="/">
          <img src={logo} alt="Car Drive Logo" />
        </Link>
      </div>
      <i
        className={`nav-toggle ${toggleClasses}`}
        onClick={(e) => {
          e.preventDefault();
          setMenuOpen(!menuOpen);
        }}
      ></i>
      <nav>
        <ul className="link-list">
          <li
            onClick={(e) => {
              setMenuOpen(false);
            }}
          >
            <Link to="/"> Home </Link>
          </li>

          <li
            onClick={(e) => {
              setMenuOpen(false);
            }}
          >
            <Link to="/contact"> Contact </Link>
          </li>

          <li
            onClick={(e) => {
              setMenuOpen(false);
            }}
          >
            <Link to="/about"> About</Link>
          </li>
        </ul>

        {user ? (
          <>
            <ul className="link-list auth-routes">
              <li
                className="admin-nav-link"
                onClick={(e) => {
                  setMenuOpen(false);
                }}
              >
                <Link to="/dashboard">Dashboard</Link>
              </li>

              <li
                className="admin-nav-link"
                onClick={(e) => {
                  setMenuOpen(false);
                }}
              >
                <Link to="/dashboard/cars">Cars</Link>
              </li>

              <li
                className="admin-nav-link"
                onClick={(e) => {
                  setMenuOpen(false);
                }}
              >
                <Link to="/dashboard/mycars">My Cars</Link>
              </li>

              <li
                className="admin-nav-link"
                onClick={(e) => {
                  setMenuOpen(false);
                }}
              >
                <Link to="/dashboard/chats">Chats</Link>
              </li>

              <span
                onClick={(e) => {
                  setMenuOpen(false);
                }}
              >
                {" "}
                <Link to="/dashboard/profile">{user.name}</Link>
              </span>

              <li
                onClick={(e) => {
                  setMenuOpen(false);
                }}
              >
                <button onClick={logout}> Logout</button>
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul className="link-list guest-routes">
              {location.pathname !== "/login" && (
                <li>
                  <Link to="/login"> Login </Link>
                </li>
              )}

              {location.pathname !== "/register" && (
                <li>
                  <Link to="/register"> Register</Link>
                </li>
              )}
            </ul>
          </>
        )}
      </nav>
    </div>
  );
}

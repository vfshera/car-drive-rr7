import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { authClient } from "~/lib/auth.client";
import logo from "~/assets/images/cardrive.png";
import { SIGNOUT_REDIRECT } from "~/constants";
import type { User } from "better-auth";

type NavbarProps = {
  user?: User | null;
};

export default function Navbar({ user }: NavbarProps) {
  const navigate = useNavigate();

  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const [toggleClasses, setToggleClasses] = useState("ti-menu");

  useEffect(() => {
    if (menuOpen) {
      setToggleClasses("ti-close menu-opened");
    } else {
      setToggleClasses("ti-menu");
    }
  }, [menuOpen]);

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
          <li>
            <Link to="/"> Home </Link>
          </li>

          <li>
            <Link to="/contact"> Contact </Link>
          </li>

          <li>
            <Link to="/about"> About</Link>
          </li>
        </ul>

        {user ? (
          <>
            <ul className="link-list auth-routes">
              <li className="admin-nav-link">
                <Link to="/dashboard">Dashboard</Link>
              </li>

              <li className="admin-nav-link">
                <Link to="/dashboard/cars">Cars</Link>
              </li>

              <li className="admin-nav-link">
                <Link to="/dashboard/mycars">My Cars</Link>
              </li>

              <li className="admin-nav-link">
                <Link to="/dashboard/chats">Chats</Link>
              </li>

              <span>
                <Link to="/dashboard/profile">Profile</Link>
              </span>

              <li>
                <button
                  onClick={async () => {
                    await authClient.signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          navigate(SIGNOUT_REDIRECT);
                        },
                      },
                    });
                  }}
                >
                  Logout
                </button>
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

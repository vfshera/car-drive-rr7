import type { Route } from "./+types/index";
import { Link } from "react-router";
import { getMeta } from "~/utils/meta";
import { appContext } from "$/server/context";

export function meta() {
  return [...getMeta({ title: "Dashboard" })];
}

export async function loader({ context }: Route.LoaderArgs) {
  const { user } = context.get(appContext);

  return { user: user! };
}

export default function Dashboard({ loaderData: { user } }: Route.ComponentProps) {
  return (
    <div className="dashboard-page">
      <h1>Welcome Back {user.name}</h1>
      <section className="dash-items">
        <Link to="/dashboard/cars">
          <div className="item-card">
            <i className="ti-car"></i>
            <p>Cars</p>
            {/* <span>{stats.cars}</span> */}
          </div>
        </Link>
        <Link to="/dashboard/mycars">
          <div className="item-card">
            <i className="ti-crown"></i>
            <p>My Cars</p>
            {/* <span>{stats.mycars}</span> */}
          </div>
        </Link>
        <Link to="/dashboard/chats">
          <div className="item-card">
            <i className="ti-comments"></i>
            <p>Messages</p>
            {/* <span>{stats.messages}</span> */}
          </div>
        </Link>

        <Link to="/dashboard/profile">
          <div className="item-card">
            <i className="ti-settings"></i>
            <p>My Profile</p>
            <span>User Settings</span>
          </div>
        </Link>
      </section>
    </div>
  );
}

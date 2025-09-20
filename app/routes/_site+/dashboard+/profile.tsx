import type { Route } from "./+types/profile";
import { useState } from "react";
import { getMeta } from "~/utils/meta";
import { appContext } from "$/server/context";

export function meta() {
  return [...getMeta({ title: "Profile" })];
}

export async function loader({ context }: Route.LoaderArgs) {
  const { user, db } = context.get(appContext);

  const accounts = await db.query.accounts.findMany({
    where: (acc, { eq }) => eq(acc.userId, user!.id),
  });

  return { user: user!, accounts };
}

export default function Account({ loaderData: { user, accounts } }: Route.ComponentProps) {
  const [isUpdate, setIsUpdate] = useState(false);

  return (
    <div className="profile-page">
      <h1>My Profile</h1>

      <div className="current-info">
        <div className="details">
          <div className="detail">
            <div className="title">Username</div>

            <div className="value">{user.name}</div>
          </div>

          <div className="detail">
            <div className="title">Email</div>

            <div className="value">{user.email}</div>
          </div>
        </div>

        <div className="social-accounts">
          <h2>OAUTH Accounts </h2>

          {accounts?.length > 0 &&
            accounts?.map((acc) => (
              <div className="social-account" key={acc.id}>
                <i className={`ti-${acc.providerId == "credential" ? "key" : acc.providerId}`}></i>

                <div className="brand capitalize">{acc.providerId}</div>
              </div>
            ))}
        </div>
      </div>

      <div className="update-info">
        <h1>Update Info</h1>

        <div className="update-actions">
          <div className="note">
            <p>
              <span>NOTE : </span>If Username or New Password is left empty it will not be updated!
            </p>
          </div>
        </div>

        <div className="allowed-updates">
          <div className="fields">
            {!isUpdate && (
              <div className="input-group three-fields">
                <label htmlFor="username">Username</label>
                {/* {updateErrors?.username && (
                            <div className="field-errors">
                                {updateErrors?.username[0]}
                            </div>
                        )} */}
                <input type="text" name="username" />
              </div>
            )}

            <div className={`input-group ${isUpdate ? "two-fields" : "three-fields"}`}>
              <label htmlFor="password">New Password</label>
              {/* {updateErrors?.password && (
                        <div className="field-errors">
                            {updateErrors?.password[0]}
                        </div>
                    )} */}

              <input type="password" name="password" />
            </div>

            <div className={`input-group ${isUpdate ? "two-fields" : "three-fields"}`}>
              <label htmlFor="repeat-password">Current Password</label>
              <input type="password" name="repeat-password" />
            </div>
          </div>

          <button>Update {isUpdate ? "Password" : "Info"}</button>
        </div>
      </div>
    </div>
  );
}

import googlemapIcon from "~/assets/images/googlemap.png";
import reactIcon from "~/assets/images/react.svg";
import tailwindIcon from "~/assets/images/tailwind.svg";
import tomtomIcon from "~/assets/images/tomtom.png";

export function meta() {
  return [{ title: "About" }];
}

export default function About() {
  return (
    <div className="about-page">
      <h1>About Page</h1>
      <div className="about-content">
        <section className="content-item">
          <div className="explanation">
            <p>
              This demo website was made by{" "}
              <a href="https://www.github.com/vfshera" target="_blank">
                <strong>Franklin Shera</strong>
              </a>{" "}
              to enable users to sign-up and sign-in. And be able to post / discover show rooms
              where the can find/view other vehicles.
            </p>
          </div>

          <div className="tech-stack">
            <p>Technologies Used</p>
            <div className="stacks">
              <div className="stack">
                <img src={reactIcon} />
                <p>React js</p>
              </div>

              <div className="stack">
                <img src={tailwindIcon} />
                <p>Tailwindcss</p>
              </div>

              <div className="stack">
                <img src={googlemapIcon} />
                {/* <p>Google Maps</p> */}
              </div>

              <div className="stack">
                <img src={tomtomIcon} />
                {/* <p>TOMTOM Maps</p> */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

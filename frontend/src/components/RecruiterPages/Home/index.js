import React from "react";
import Navbar from "../Navbar";
import "./index.css";

function RecruiterHome() {
  const recruiterInfo = JSON.parse(localStorage.getItem("recruiterInfo"));
  const recruiterName = recruiterInfo ? recruiterInfo.username : null;

  return (
    <div className="recruiter-home-page">
      <Navbar />
      <div className="recruiter-home-page-container">
        <section>
          <h1 className="green-heading">{recruiterName ? `Welcome, ${recruiterName}!` : "Welcome to Career Guru Recruiter Portal"}</h1>
          <p>
            At Career Guru, we understand the importance of finding the right
            talent for your team. Our platform is designed to make the recruitment
            process seamless, efficient, and enjoyable.
          </p>
        </section>

        <section>
          <h2 className="green-heading">Why Choose Career Guru?</h2>
          <p>
            We make hiring a breeze by providing you with a pool of exceptional
            candidates. Our innovative features and user-friendly interface
            empower you to connect with top-notch professionals effortlessly.
          </p>
        </section>

        <section>
          <h2 className="green-heading">Key Features:</h2>
          <ul>
            <li>Extensive Talent Pool: Access a diverse and skilled talent pool.</li>
            <li>Efficient Search: Find candidates that match your requirements with ease.</li>
            <li>Interactive Platform: Enjoy a dynamic and engaging recruitment experience.</li>
            <li>Time-Saving: Streamline your hiring process for quicker results.</li>
            <li>Collaborative Tools: Foster effective communication and collaboration with your team.</li>
          </ul>
        </section>

        <section>
          <h2 className="green-heading">Get Started Today!</h2>
          <p>
            Join Career Guru and revolutionize your hiring journey. Whether
            you are looking for seasoned professionals or fresh talent, we've got
            you covered. Connect with us and discover a world where recruitment
            meets innovation.
          </p>
        </section>
      </div>
    </div>
  );
}

export default RecruiterHome;

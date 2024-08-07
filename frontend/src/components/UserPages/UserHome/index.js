import React from "react";
import UserNavbar from "../UserNavbar";
import "./index.css";

function JobSeekerHome() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userName = userInfo ? userInfo.username : null;

  return (
    <div className="jobseeker-home-page">
      <UserNavbar />
      <div className="jobseeker-home-page-container">
        <section>
          <h1 className="blue-heading">{userName ? `Welcome, ${userName}!` : "Welcome to Career Guru Job Seeker Portal"}</h1>
          <p>
            Your next career opportunity awaits! At Career Guru, we are dedicated to helping
            you find the perfect job that matches your skills and aspirations. Explore our
            platform for a seamless and rewarding job search experience.
          </p>
        </section>

        <section>
          <h2 className="blue-heading">Why Choose Career Guru?</h2>
          <p>
            We understand the challenges of job hunting, and our platform is designed to
            make the process efficient and enjoyable. Here's why you should choose Career Guru:
          </p>
          <ul>
            <li>Expansive Job Listings: Access a wide range of job opportunities from top companies.</li>
            <li>Smart Job Matching: Find positions that align with your skills and preferences effortlessly.</li>
            <li>User-Friendly Interface: Navigate our platform with ease for a pleasant job search experience.</li>
            <li>Time-Efficient: Save time with our streamlined application process.</li>
            <li>Community Support: Connect with other job seekers and share insights for mutual growth.</li>
          </ul>
        </section>

        <section>
          <h2 className="blue-heading">Get Started on Your Career Journey!</h2>
          <p>
            Join Career Guru today to embark on a journey towards your dream job. Whether you're
            an experienced professional or a fresh graduate, we have opportunities for everyone.
            Connect with us and experience a world where job seeking meets innovation.
          </p>
        </section>
      </div>
    </div>
  );
}

export default JobSeekerHome;

import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About Campus Bytes</h1>
        <p>Campus Bytes is your go-to platform for discovering food options around the UF campus. Whether you're craving a quick snack or a hearty meal, we've got you covered!</p>
      </section>

      <section className="about-features">
        <h2>Features</h2>
        <ul>
          <li>Search for nearby restaurants and cafes around UF</li>
          <li>Sort and filter options by distance, ratings, and cuisine</li>
          <li>Access restaurant details, including location, contact info, and reviews</li>
        </ul>
      </section>

      <section className="about-call-to-action">
        <p>Explore dining options tailored for students by students.</p>
        <a href="/foodoptions" className="explore-button">Start Exploring</a>
      </section>
    </div>
  );
};

export default About;

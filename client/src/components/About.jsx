
import './About.css';
import React, { useState, useEffect } from 'react';

const About = () => {
  const [user, setUser] = useState(null);
  return (
    
    <div className="about-container">
      <div className="bg-neutral-200 bg-opacity-80 p-8 rounded-lg shadow-lg m-10">
        <section className="about-hero">
          <h1 className='font-custom'>About Campus Bytes</h1>
          <p className=''>Campus Bytes is your go-to platform for discovering food options around the UF campus. Whether you're craving a quick snack or a hearty meal, we've got you covered!</p>
        </section>

        <section className="about-features">
          <h2 className='font-custom'>Features</h2>
          <ul>
            <li className=''>Search for nearby restaurants and cafes around UF</li>
            <li className=''>Sort and filter options by distance, ratings, and cuisine</li>
            <li className=''>Access restaurant details, including location, contact info, and reviews</li>
          </ul>
        </section>

        <section className="about-call-to-action">
          <p className=''>Explore dining options tailored for students by students.</p>
          {user ? (
            <a href="/foodoptions" className="explore-button font-custom">Start Exploring</a>) 
            :(
              <a href="/signup" className="explore-button font-custom">Start Exploring</a>
            )}
        </section>
      </div>
    </div>
  );
};

export default About;

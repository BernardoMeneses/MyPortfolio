import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Portfolio from '../components/Portfolio';
import Recommendations from '../components/Recommendations';
import Contact from '../components/Contact';

const Home = () => (
  <div>
    <Hero />
    <About />
    <Skills />
    <Portfolio />
    <Recommendations />
    <Contact />
  </div>
);

export default Home;

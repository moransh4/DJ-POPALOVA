import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import WorkWith from './components/WorkWith/WorkWith'; // Import the new WorkWith component
import About from './components/About/About';
import Reviews from './components/Reviews/Reviews';
import Gallery from './components/Gallery/Gallery';
import InstagramFeed from './components/InstagramFeed/InstagramFeed';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Script from 'next/script';

import './styles.css'

export default function HomePage() {

 
  return (
    <main>
      <Navbar />
      <Hero />
      <About/>
      <Services />
      <WorkWith />
      <Reviews />
      <Gallery />
      <InstagramFeed />
      <Contact />
      <Footer />
      <Script async src="//www.instagram.com/embed.js"></Script>
    </main>
  );
}

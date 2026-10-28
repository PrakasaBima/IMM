import { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import About from './components/About.jsx';
import Structure from './components/Structure.jsx';
import Services from './components/Services.jsx';
import ServiceDetail from './components/ServiceDetail.jsx';
import Projects from './components/Projects.jsx';
import Quality from './components/Quality.jsx';
import Clients from './components/Clients.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import { usePath } from './router.jsx';

export default function App() {
  const path = usePath();
  const serviceSlug = path.match(/^\/layanan\/([^/]+)\/?$/)?.[1];

  // Saat pindah halaman: lompat ke #bagian bila ada, selain itu ke atas
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const target = hash && document.getElementById(hash);
    if (target) target.scrollIntoView({ behavior: 'instant' });
    else window.scrollTo({ top: 0, behavior: 'instant' });
  }, [path]);

  if (serviceSlug) return <ServiceDetail slug={serviceSlug} />;

  return (
    <>
      <Navbar />
      <main id="top">
        <Hero />
        <Marquee />
        <About />
        <Structure />
        <Services />
        <Projects />
        <Quality />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

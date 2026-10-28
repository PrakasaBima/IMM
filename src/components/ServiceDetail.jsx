import { useEffect } from 'react';
import Reveal from './Reveal.jsx';
import Icon from './Icon.jsx';
import { Link } from '../router.jsx';
import { company, services } from '../data.js';

export default function ServiceDetail({ slug }) {
  const index = services.findIndex((s) => s.slug === slug);
  const service = services[index];

  useEffect(() => {
    const prev = document.title;
    document.title = `${service ? service.title : 'Layanan tidak ditemukan'} — ${company.name}`;
    return () => {
      document.title = prev;
    };
  }, [service]);

  return (
    <>
      <header className="nav scrolled">
        <div className="container">
          <Link to="/" className="brand" aria-label={company.name}>
            <img src="/img/logo.png" alt="" className="brand-logo" width="346" height="234" />
            <span className="brand-name">
              {company.short}
              <small>{company.tagline}</small>
            </span>
          </Link>
          <Link to="/#layanan" className="btn btn-ghost btn-back">
            <Icon name="arrow" strokeWidth={2} /> Semua layanan
          </Link>
        </div>
      </header>

      <main>
        {service ? <Detail service={service} index={index} /> : <NotFound />}
      </main>
    </>
  );
}

function Detail({ service, index }) {
  const { intro, scope, images } = service.detail;

  return (
    <>
      <section className="detail-hero">
        <div className="container">
          <Reveal className="detail-hero-inner">
            <span className="eyebrow">Layanan {String(index + 1).padStart(2, '0')}</span>
            <div className="service-icon">
              <Icon name={service.icon} />
            </div>
            <h1>{service.title}</h1>
            <p>{intro}</p>
          </Reveal>
        </div>
      </section>

      <section className="detail-body">
        <div className="container">
          <div className={`detail-grid ${images.length ? '' : 'no-media'}`}>
            <Reveal>
              <h2>Lingkup pekerjaan</h2>
              <ul className="vm-list">
                {scope.map((item) => (
                  <li key={item}>
                    <Icon name="check" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            {images.length > 0 && (
              <Reveal className="detail-gallery">
                {images.map((p) => (
                  <figure className="shot" key={p.img}>
                    <img src={`/img/${p.img}`} alt={p.alt} loading="lazy" />
                  </figure>
                ))}
              </Reveal>
            )}
          </div>

          <Reveal className="detail-cta">
            <div>
              <h2>Butuh layanan {service.title}?</h2>
              <p>Ceritakan kebutuhan proyek Anda, tim kami siap membantu.</p>
            </div>
            <a href={company.whatsapp} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              Chat WhatsApp <Icon name="arrow" strokeWidth={2} />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function NotFound() {
  return (
    <section className="detail-hero">
      <div className="container detail-hero-inner">
        <span className="eyebrow">Layanan</span>
        <h1>Layanan tidak ditemukan.</h1>
        <p>Halaman yang Anda cari tidak tersedia.</p>
        <Link to="/#layanan" className="btn btn-primary">
          Lihat semua layanan
        </Link>
      </div>
    </section>
  );
}

import Reveal from './Reveal.jsx';
import SectionHead from './SectionHead.jsx';
import Icon from './Icon.jsx';
import { Link } from '../router.jsx';
import { services } from '../data.js';

export default function Services() {
  return (
    <section id="layanan">
      <div className="container">
        <Reveal>
          <SectionHead eyebrow="Layanan" title="Satu mitra, semua kebutuhan engineering." />
        </Reveal>

        <Reveal className="services-grid">
          {services.map((s, i) => (
            <Link
              to={`/layanan/${s.slug}`}
              className="service"
              key={s.slug}
              // Tombol "kembali" browser dari halaman detail mendarat di bagian Layanan
              onClick={() => window.history.replaceState(null, '', '/#layanan')}
            >
              <span className="service-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="service-arrow">
                <Icon name="arrowUpRight" strokeWidth={2} />
              </span>
              <div className="service-icon">
                <Icon name={s.icon} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

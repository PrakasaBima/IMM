import { Fragment } from 'react';
import Reveal from './Reveal.jsx';
import SectionHead from './SectionHead.jsx';
import { organization } from '../data.js';

const initials = (text) =>
  text
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

function Member({ name, role, note, lead }) {
  return (
    <div className={`org-card ${lead ? 'lead' : ''}`}>
      <span className="org-avatar">{initials(name ?? role)}</span>
      <div>
        <strong>{name ?? role}</strong>
        <span>{name ? role : 'Tim'}</span>
        {note && <small>↳ {note}</small>}
      </div>
    </div>
  );
}

export default function Structure() {
  return (
    <section className="structure" id="struktur">
      <div className="container">
        <Reveal>
          <SectionHead eyebrow="Struktur Organisasi" title="Tim di balik setiap proyek." />
        </Reveal>

        <Reveal className="org">
          {organization.map((tier, ti) => (
            <div className="org-tier" style={{ '--n': tier.members.length }} key={tier.level}>
              {tier.members.map((m, i) => (
                <Fragment key={m.role}>
                  <Member {...m} />
                  {m.team && (
                    <div className="org-branch" style={{ '--col': i + 1 }}>
                      {m.team.map((t) => (
                        <Member key={t.role} {...t} />
                      ))}
                    </div>
                  )}
                </Fragment>
              ))}
              {/* Garis tengah hanya diteruskan bila masih ada tingkat di bawahnya */}
              {tier.members.some((m) => m.team) && ti < organization.length - 1 && (
                <span className="org-stem" />
              )}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

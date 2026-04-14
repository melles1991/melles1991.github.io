import { formatScore, getCharacterClassSlug } from '../lib/format';

const ROLE_META = {
  healer: {
    label: 'Рейтинг хіла',
    icon: <svg viewBox="0 0 24 24"><path d="M18 14H14V18H10V14H6V10H10V6H14V10H18" fill="currentColor"></path></svg>,
  },
  dps: {
    label: 'Рейтинг DPS',
    icon: <svg viewBox="0 0 24 24"><path d="M6.92,5H5L14,14L15,13.06M19.96,19.12L19.12,19.96C18.73,20.35 18.1,20.35 17.71,19.96L14.59,16.84L11.91,19.5L10.5,18.09L11.92,16.67L3,7.75V3H7.75L16.67,11.92L18.09,10.5L19.5,11.91L16.83,14.58L19.95,17.7C20.35,18.1 20.35,18.73 19.96,19.12Z" fill="currentColor"></path></svg>,
  },
  tank: {
    label: 'Рейтинг танка',
    icon: <svg viewBox="0 0 24 24"><path d="M12,2L4,5V11C4,16.55 7.84,21.74 12,23C16.16,21.74 20,16.55 20,11V5L12,2Z" fill="currentColor"></path></svg>,
  },
};

function ScorePill({ role, data }) {
  if (!data?.score) return null;
  const meta = ROLE_META[role];
  return (
    <div className={`rio-pill member-chip is-${role}`} style={{ color: data.color, borderColor: `${data.color}40` }}>
      <span aria-hidden="true" className="role-icon">{meta.icon}</span>
      <span className="chip-value">{formatScore(data.score)}</span>
      <div className="rio-tooltip">
        <div className="tooltip-header">{meta.label}</div>
        <div className="tooltip-text" style={{ color: data.color }}>{formatScore(data.score)}</div>
      </div>
    </div>
  );
}

export default function CharacterCard({ character }) {
  return (
    <a className={`character class-${getCharacterClassSlug(character.class)}`} href={character.link} rel="noopener noreferrer" target="_blank">
      <div className="char-avatar-container">
        <img alt={character.class} className="char-avatar" loading="lazy" src={character.avatar} />
      </div>
      <div className="char-details">
        <div className="char-info">
          <strong>{character.name}</strong>
          <div className="stats">
            {character.race} · {character.class} · {character.realm}
          </div>
          {character.guild?.name ? <div className="guild">‹{character.guild.name}›</div> : null}
        </div>
        <div className="rio-scores home-rio-scores">
          <ScorePill role="healer" data={character.healer} />
          <ScorePill role="dps" data={character.dps} />
          <ScorePill role="tank" data={character.tank} />
        </div>
      </div>
    </a>
  );
}

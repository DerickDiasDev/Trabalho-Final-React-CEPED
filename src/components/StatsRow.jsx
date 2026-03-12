export default function StatsRow({ stats }) {
  return (
    <div className="stats-row">
      {[
        { key: "ok", label: "Ok" },
        { key: "warn", label: "Perto de Vencer" },
        { key: "danger", label: "Vencidos" },
      ].map(({ key, label }) => (
        <div key={key} className={`stat-card ${key}`}>
          <div className={`stat-label ${key}`}>
            <span className={`stat-dot ${key}`} /> {label}
          </div>
          <div className={`stat-number ${key}`}>{stats[key]}</div>
        </div>
      ))}
    </div>
  );
}

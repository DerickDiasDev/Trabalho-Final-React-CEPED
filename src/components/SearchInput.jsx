import "./SearchInput.css";

export default function SearchInput({ value, onChange }) {
  return (
    <div className="search-input-wrap">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        className="form-input"
        placeholder="Pesquisar..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ paddingLeft: 32 }}
      />
    </div>
  );
}

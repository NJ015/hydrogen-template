export default function SearchBar({ filterText, onFilterTextChange }) {
    return (
      <form className="searchBar">
        <input
          type="text"
          value={filterText}
          placeholder="Search..."
          onChange={(e) => onFilterTextChange(e.target.value)}
          className="searchInput"
        />
      </form>
    );
  }
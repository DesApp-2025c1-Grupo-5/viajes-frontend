const SearchBar = ({onSearch, value}) => {
  return (
    <input
      type="search"
      className="w-116 max-w-4xl border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      placeholder="Buscar"
      aria-label="Search"
      aria-describedby="button-addon2"
      onChange={(e) => onSearch(e.target.value)}
      value={value}
    ></input>
  );
};

export default SearchBar;

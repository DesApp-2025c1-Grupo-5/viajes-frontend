const SearchBar = () => {
  return (
    <input
      type="search"
      className="max-w-3xl bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center justify-between text-gray-900"
      placeholder="Buscar"
      aria-label="Search"
      aria-describedby="button-addon2"
    ></input>
  );
};

export default SearchBar;

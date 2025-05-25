import { Link } from "react-router-dom";

const Header = () => {

  return (
    // falta aplicar el degradado
    <header className="g-whiteb-600 px-6 py-4 shadow-md">
      <Link to="/">
        <h1 className="text-3xl text-blue-600 font-bold cursor-pointer">
            Logística Acme SRL
        </h1>
      </Link>
    </header>
  );
};

export default Header;

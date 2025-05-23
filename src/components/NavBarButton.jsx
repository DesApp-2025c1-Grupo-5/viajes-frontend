import { useNavigate } from "react-router-dom";

const NavBarButton = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(props.path);
  };

  return (
    <button
      onClick={handleClick}
      className="text-white px-4 py-2 rounded flex items-center hover:bg-blue-700 hover:scale-105 group"
      href={props.link}
    >
      <svg
        className="w-8 h-8 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {props.icon}
      </svg>
      <div className="text-2xl">{props.name}</div>
    </button>
  );
};

export default NavBarButton;

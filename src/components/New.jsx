import { useNavigate } from "react-router-dom";

const New = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(props.path);
  };

  return (
    <button
      onClick={handleClick}
      href={props.link}
      className={`max-w-3xs ${props.bgColor} ${props.colorHover} text-white rounded-2xl shadow px-4 py-3 flex items-center justify-between mt-8`}
    >
      <p className="text-white">Nuevo +</p>
    </button>
  );
};

export default New;

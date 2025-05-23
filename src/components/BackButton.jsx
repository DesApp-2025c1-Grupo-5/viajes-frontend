import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(props.path);
  };

  return (
    <button onClick={handleClick}>
      <ArrowLeft className="w-7 h-7 cursor-pointer" />
    </button>
  );
};

export default BackButton;

const NavBarButton = (props) => {
  return (
    <button className="text-white px-4 py-2 rounded flex items-center hover:bg-blue-700" href={props.link}>
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

const Title = (props) => {
  return (
    <div>
        <h1 className={`text-4xl font-bold ${props.color}`}>{props.title}</h1>
        <h2 className="text-xl text-gray-600">{props.description}</h2>
    </div>
  );
};

export default Title;

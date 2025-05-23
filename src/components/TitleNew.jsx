const TitleNew = (props) => {
  return (
    <div>
        <h1 className={`text-4xl font-bold ${props.color}`}>{props.title}</h1>
    </div>
  );
};

export default TitleNew;


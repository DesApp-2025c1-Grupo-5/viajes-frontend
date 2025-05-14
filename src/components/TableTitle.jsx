const TableTitle = (props) => {
  return (
    <div>
        <h1 className={`mt-8 text-lg font-bold ${props.color}`}>{props.title}</h1>
        <h2 className="text-md text-gray-500">{props.description}</h2>
    </div>
  );
};

export default TableTitle;

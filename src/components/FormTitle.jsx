const FormTitle = (props) => {
  return (
    <div>
        <h1 className={`mt-8 text-lg font-bold ${props.color}`}>{props.title}</h1>
        <h2 className="text-md text-gray-500">{props.description}</h2>
        <p className="text-red-500">* Campo Obligatorio</p>
    </div>
  );
};

export default FormTitle;

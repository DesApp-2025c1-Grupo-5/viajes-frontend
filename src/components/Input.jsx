const Input = (props) => {
  return (
    <>
      <div className="mb-2 text-sm font-medium text-gray-700 mt-8 ">
        <label htmlFor={props.id}>{props.title}</label>
        <input
          required
          placeholder={props.placeholder}
          id={props.id}
          type="text"
          className="w-full max-w-sm bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center justify-between text-gray-900"
        />
      </div>
    </>
  );
};

export default Input;

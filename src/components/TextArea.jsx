const TextArea = (props) => {
  return (
    <>
      <div className="text-sm font-medium text-gray-700">
        <label htmlFor={props.id}>{props.title}</label>
        <textarea
          className="w-full max-w-sm bg-white border-1 border-gray-300 rounded-2xl shadow-lg px-4 py-3 flex items-center justify-between text-gray-900 resize-none"
          placeholder={props.placeholder}
          id={props.id}
          rows={5}
          cols={40}
          name={props.name}
          onChange={props.onChange}
          value={props.value}
          required={props.required}
        ></textarea>
      </div>
    </>
  );
};

export default TextArea;

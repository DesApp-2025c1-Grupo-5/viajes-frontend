const ViewField = (props) => {
  return (
    <div className="text-sm font-medium text-gray-700">
      <label htmlFor={props.id}>{props.title}</label>
      <textarea
        value={props.value}
        id={props.id}
        type="text"
        className="w-full h-32 bg-gray-100 border-1 border-gray-300 rounded-2xl shadow-lg px-4 py-3 flex items-center justify-between text-gray-900 resize-none"
        readOnly
        disabled
      />
    </div>
  );
};

export default ViewField;
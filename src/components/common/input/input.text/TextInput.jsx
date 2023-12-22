export const TextInput = ({
  name,
  type,
  error,
  value,
  label,
  onBlur,
  onChange,
  condition,
  className,
}) => {
  return (
    <div className="mb-3 w-full text-right">
      <label
        className="block text-[#abd6a9] text-sm font-bold mb-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.9)] "
        htmlFor={name}
      >
        <div className="flex items-center gap-4">
          {label} :
          {condition ? (
            <div className="text-xs text-red-500">{error}</div>
          ) : null}
        </div>
      </label>
      <input
        className={`${className} placeholder:text-[#e4d4a7] bg-transparent appearance-none border border-[##abd6a9] rounded w-full py-2 px-3 text-orange-200 leading-tight focus:outline-none autofill:bg-yellow-200`}
        min="0"
        id={name}
        name={name}
        type={type}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={label}
        autoComplete="off"
      />
    </div>
  );
};

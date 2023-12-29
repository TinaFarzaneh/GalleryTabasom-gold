export const TextArea = ({
  name,
  rows,
  onChange,
  value,
  label,
  placeholder,
  className,
  onBlur,
  condition,
  error,
}) => {
  return (
    <div className="mb-4 w-full text-right">
      <label
        htmlFor={name}
        className="text-[#ffd255] text-sm font-bold mb-2 flex items-start text-start"
      >
        <div className="flex  gap-4">
          {label} :
          {condition ? (
            <div className="text-xs text-red-500">{error}</div>
          ) : null}
        </div>
      </label>
      <textarea
        id={name}
        rows={rows}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        name={name}
        autoComplete="off"
        placeholder={placeholder}
        className={`block px-3 shadow text-[#ffd255] p-2.5 w-full rounded-lg border ${className} bg-transparent`}
      ></textarea>
    </div>
  );
};

// <TextArea
// condition={formik.touched.address && formik.errors.address}
// error={formik.errors.address}
// onChange={formik.handleChange}
// onBlur={formik.handleBlur}
// value={formik.values.address}
// id="address"
// rows={4}
// label="آدرس:"
// className={`${
//   formik.touched.address && formik.errors.address
//     ? "border-red-500 focus:outline-none focus:border-red-500"
//     : "focus:outline-none focus:border-blue-500"
// }`}
// />

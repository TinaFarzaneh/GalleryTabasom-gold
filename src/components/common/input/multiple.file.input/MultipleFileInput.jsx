export const MultipleFileInput = ({
  label,
  name,
  id,
  // files,
  onChange,
  multiple,
}) => {
  return (
    <div dir="ltr" className="mb-3 w-full text-right">
      <label htmlFor={name} className="mb-2 inline-block text-[#abd6a9]">
        : {label}
      </label>
      <input
        className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-[#ffd255] transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-[#30260a] file:px-3 file:py-[0.32rem] file:text-[#ffd255] file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-[#30260a]  focus:text-[#ffd255] focus:shadow-te-primary dark:file:cursor-pointer"
        // type="file"
        // id="formFileMultiple"
        // multiple
        type="file"
        name={name}
        id={id}
        multiple={multiple}
        // files={files}
        onChange={onChange}
      />
    </div>
  );
};

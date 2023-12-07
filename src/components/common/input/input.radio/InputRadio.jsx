export const RadioInput = ({ children, checked, onFilter, id }) => {
  return (
    <>
      <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
        <input
          className="relative float-left mt-1 h-4 w-4 rounded-full border-3 border-solid cursor-pointer"
          type="radio"
          name="inlineRadioOptions"
          id={id}
          value="option1"
          onChange={onFilter}
          checked={checked}
        />
        <label
          className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
          htmlFor={id}
        >
          {children}
        </label>
      </div>
    </>
  );
};

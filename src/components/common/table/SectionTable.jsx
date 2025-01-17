import { Button } from "../button/Button";
export const SectionTable = ({
  tableTitle,
  title,
  maincolor,
  onClick,
  condition = true,
}) => {
  return (
    <>
      <div className="flex justify-between items-center px-40">
        <h1 className="font-extrabold text-3xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          {tableTitle}
        </h1>
        {condition && (
          <Button title={title} maincolor={maincolor} onClick={onClick} />
        )}
      </div>
    </>
  );
};

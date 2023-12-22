import { TCell } from "./Tcell";

export const THead = ({ columns = [] }) => {
  return (
    <thead className="border-b font-medium bg-[#739072] shadow-sm">
      <tr>
        {columns.map((col) => (
          <TCell
            key={col.id}
            title={col.title}
            icon={col.icon}
            width={col.width}
          />
        ))}
      </tr>
    </thead>
  );
};

export const TCell = ({ title, width, icon }) => {
  return (
    <th className={`${width} px-6 py-4 text-right`}>
      <div className="flex items-center gap-1">
        <div className="cursor-pointer">{icon}</div>
        {title}
      </div>
    </th>
  );
};

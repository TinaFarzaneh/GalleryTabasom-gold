import ReactDOM from "react-dom";

export const WrapperModals = ({ children, onClick }) => {
  return ReactDOM.createPortal(
    <div onClick={onClick} className="fixed inset-0 z-30 ">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-[#202020] opacity-50" />
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        {children}
      </div>
    </div>,
    document.getElementById("overlay-root")
  );
};

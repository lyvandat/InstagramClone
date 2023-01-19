// *** IMPORTANT, fixed: document is not defined (React hydration error)

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

// *** modal div phải nằm trên root div trong file html

const Modal: React.FC<{
  children: React.ReactNode;
  className: string;
  onClick: () => void;
}> = (props) => {
  // fix react hydration error.
  const [isDocument, setIsDocument] = useState(true);

  useEffect(() => {
    if (typeof document !== "undefined") {
      setIsDocument(true);
    }
  }, [document]);

  return (
    <React.Fragment>
      {isDocument &&
        ReactDOM.createPortal(
          <div className="z-10 flex items-center justify-center fixed w-full h-full left-0 top-0">
            <div
              onClick={props.onClick}
              className="absolute w-full h-full left-0 top-0 bg-black/70 z-20"
            ></div>
            <div
              className={`animate-[stretch_50ms_ease-in-out] absolute bg-white rounded-xl z-30 ${props.className}`}
            >
              {props.children}
            </div>
          </div>,
          document.getElementById("modal") as HTMLElement
        )}
    </React.Fragment>
  );
};

export default Modal;

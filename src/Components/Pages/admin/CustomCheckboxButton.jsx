import React, { useState } from "react";
import icon23 from "../../../assets/sideBarIcon/icon23.svg";

const CustomCheckboxButton = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setIsChecked((prev) => !prev)}
      style={{
        backgroundColor: isChecked ? "#18181B" : "#FFFFFF",
      }}
      className={`h-[18px] w-[18px] rounded-[5px] border border-gray-300 flex items-center justify-center transition-colors cursor-pointer shadow-sm flex-shrink-0 ${
        isChecked ? "border-[#18181B]" : "hover:border-gray-400"
      }`}
    >
      {isChecked ? (
        /* Rendered directly as a bold, rounded SVG to match the image precisely */
        <svg
          className="h-[10px] w-[10px] text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        /* If you still want to display your icon23 in unchecked state */
        /* <img src={icon23} alt="ic" className="h-3 w-3" /> */
        null
      )}
    </button>
  );
};

export default CustomCheckboxButton;
import React from "react";

const RadioButton = ({label,value,selectedValue,onChange,name = "method"}) => {
    const isSelected = selectedValue === value;
  
    return (
      <label key={value} className={`font-semibold text-sm cursor-pointer px-4 py-2 rounded-full border transition-all ${isSelected ? "bg-primary1 text-white outline-primary1 outline-offset-1 outline-1" : "bg-bglight text-primary1 border-primary1"}`}>
        <input
          type="radio"
          name={name}
          value={value}
          className="sr-only"
          checked={isSelected}
          onChange={() => onChange(value)}
        />
        {label}
      </label>
    );
  };

export default RadioButton;
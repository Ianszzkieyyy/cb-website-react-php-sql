import React from "react";

const Checkbox = ({id, onChange, checked }) => {
    return (
        <div>
            <div class="flex items-center mb-2">
                <input id={id} type="checkbox" onChange={onChange} checked={checked} value="" className="w-4 h-4 text-secondary1 bg-bglight border-secondary1 rounded-sm focus:ring-secondary1 focus:ring-2" />
                <label for={id} className="ms-2 text-sm font-inter font-medium text-textdark ">{id}</label>
            </div>
        </div>
    )


}

export default Checkbox
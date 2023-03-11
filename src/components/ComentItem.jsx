import React from "react";

const ComentItem = ({ coment }) => {
    const avatar = coment.trim().toUpperCase().split("").slice(0, 2);
    return (
        <div className="flex items-center gap-3 pb-1 border-b border-gray-500">
            <div className="flex items-center justify-center shrink-0  rounded-full w-10 h-10 bg-blue-300 text-sm">
                {avatar}
            </div>
            <div className="felx text-gray-300 text-[10px]">{coment}</div>
        </div>
    );
};

export default ComentItem;

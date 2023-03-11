import React from "react";

const PopularPosts = ({ title }) => {
    return (
        <div className="bg-gray-600 my-1 ">
            <div className="flex text-xs p-2 text-gray-300 hover:bg-gray-800 hover:text-white">
                {title}
            </div>
        </div>
    );
};

export default PopularPosts;

import React from "react";
import { AiFillEye, AiOutlineMessage } from "react-icons/ai";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const PostItem = ({ _id, imageUrl, username, title, text, createdAt, views, coments }) => {
    return (
        <Link to={`/${_id}`}>
            <div className="flex flex-col basis-1/4 flex-grow pb-2  border-b rounded-sm border-gray-700">
                <div className={imageUrl ? "flex rounded-sm h-88" : "flex rounded-sm"}>
                    {imageUrl && (
                        <img
                            src={`https://react-blog-mern.herokuapp.com/${imageUrl}`}
                            alt="img"
                            className="object-cover  w-full"
                        />
                    )}
                </div>

                <div className="flex justify-between items-center pt-2">
                    <div className="text-xs text-white opacity-50">{username}</div>
                    <div className="text-xs text-white opacity-50">
                        <Moment date={createdAt} format="D MMM YYYY" />
                    </div>
                </div>

                <div className="text-white text-xl">{title}</div>
                <p className="text-white opacity-60 text-xs pt-4 line-clamp-3"> {text}</p>

                <div className="flex gap-3 items-center mt-2">
                    <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                        <AiFillEye />
                        <span>{views}</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                        <AiOutlineMessage />
                        <span>{coments.length}</span>
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default PostItem;

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import axios from "../utils/axios";
import { updatePost } from "../redux/features/post/postSlice";

const EditPostPage = () => {
    const dispatch = useDispatch();
    // eslint-disable-next-line
    const navigate = useNavigate();
    const params = useParams();

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [oldImage, setOldImage] = useState("");
    const [newImage, setNewImage] = useState("");

    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`);
        setTitle(data.title);
        setText(data.text);
        setOldImage(data.imageUrl);
    }, [params.id]);

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    const handleChangeImage = ({ target }) => {
        setNewImage(target.files[0]);
        setOldImage("");
    };

    const handleCheckImage = () => {
        if (!newImage && !oldImage) {
            return true;
        } else if (!newImage && oldImage) {
            return false;
        } else if (newImage && !oldImage) {
            return false;
        }
    };

    const handleSubmit = () => {
        try {
            const updatedPost = new FormData();
            updatedPost.append("title", title);
            updatedPost.append("text", text);
            updatedPost.append("id", params.id);
            updatedPost.append("imageUrl", newImage);
            dispatch(updatePost(updatedPost));
            navigate("/posts");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className="w-1/3 mx-auto py-10" onSubmit={(e) => e.preventDefault()}>
            {handleCheckImage() && (
                <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
                    Add Image
                    <input onChange={handleChangeImage} type="file" className="hidden" />
                </label>
            )}

            <div className="flex object-cover py-2  position: relative">
                {oldImage && (
                    <>
                        <img src={`http://localhost:3002/${oldImage}`} alt={oldImage.name} />{" "}
                        <button
                            type="button"
                            onClick={() => setOldImage("")}
                            className="flex items-center bg-red-400 text-xs text-white rounded-sm py-1 px-1 position: absolute right-4 top-4 hover:bg-red-500"
                        >
                            Х
                        </button>
                    </>
                )}
                {newImage && (
                    <>
                        <img src={URL.createObjectURL(newImage)} alt={newImage.name} />{" "}
                        <button
                            type="button"
                            onClick={() => setNewImage("")}
                            className="flex items-center bg-red-400 text-xs text-white rounded-sm py-1 px-1 position: absolute right-4 top-4 hover:bg-red-500"
                        >
                            Х
                        </button>
                    </>
                )}
            </div>

            <label className="text-xs  text-white opacity-70">
                Title
                <input
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                    type="text"
                    className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
                    placeholder="Title"
                />
            </label>
            <label className="text-xs text-white opacity-70">
                Text
                <textarea
                    value={text}
                    onChange={({ target }) => setText(target.value)}
                    className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700"
                    placeholder="Text"
                />
            </label>

            <div className="flex gap-8 items-center justify-center mt-4">
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="flex items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
                >
                    Update post
                </button>
            </div>
        </form>
    );
};

export default EditPostPage;

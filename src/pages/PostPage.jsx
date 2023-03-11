import axios from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiFillEye, AiOutlineMessage, AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";
import Moment from "react-moment";
import { SelectAuth } from "../redux/features/auth/authSlice";
import { deletePost } from "../redux/features/post/postSlice";
import { toast } from "react-toastify";
import { createComent, getPostComments } from "../redux/features/coment/comentSlice";
import ComentItem from "../components/ComentItem";

const PostPage = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(SelectAuth);
    const { coments } = useSelector((state) => state.coment);
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState("");

    const handleRemovePost = () => {
        try {
            dispatch(deletePost(params.id));
            toast("Post was remove");
            navigate("/posts");
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = () => {
        try {
            const postId = params.id;

            dispatch(createComent({ postId, coment: comment }));
            setComment("");
        } catch (error) {
            console.log(error);
        }
    };

    const fetchComments = useCallback(async () => {
        try {
            dispatch(getPostComments(params.id));
        } catch (error) {
            console.log(error);
        }
    }, [dispatch, params.id]);

    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`);
        setPost(data);
    }, [params.id]);

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    if (!post) {
        return <div> loading</div>;
    }

    return (
        <div>
            <Link to="/">
                <button className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
                    Back
                </button>
            </Link>
            <div className="flex gap-10 py-8">
                <div className="w-2/3">
                    <div className="flex flex-col basis-1/4 flex-grow ">
                        <div className={post.imageUrl ? "flex rounded-sm h-88" : "flex rounded-sm"}>
                            {post.imageUrl && (
                                <img
                                    src={`http://localhost:3002/${post.imageUrl}`}
                                    alt="img"
                                    className="object-cover  w-full"
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <div className="text-xs text-white opacity-50">{post.username}</div>
                        <div className="text-xs text-white opacity-50">
                            <Moment date={post.createdAt} format="D MMM YYYY" />
                        </div>
                    </div>

                    <div className="text-white text-xl">{post.title}</div>
                    <p className="text-white opacity-60 text-xs pt-4"> {post.text}</p>

                    <div className="flex gap-3 items-center mt-2 justify-between">
                        <div className="flex gap-3 mt-4">
                            <button className="flex items-center justify-center gap-2 text-sm text-white opacity-50">
                                <AiFillEye />
                                <span>{post.views}</span>
                            </button>
                            <button className="flex items-center justify-center gap-2 text-sm text-white opacity-50">
                                <AiOutlineMessage />
                                <span>{post.coments?.length}</span>
                            </button>
                        </div>
                        {user?._id === post.author && (
                            <div className="flex gap-3 mt-4">
                                <button className="flex items-center justify-center gap-2  text-white opacity-50 hover:opacity-100">
                                    <Link to={`/${params.id}/edit`}>
                                        <AiTwotoneEdit />
                                    </Link>
                                </button>
                                <button
                                    onClick={handleRemovePost}
                                    className="flex items-center justify-center gap-2  text-white opacity-50 hover:opacity-100"
                                >
                                    <AiTwotoneDelete />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm">
                    {user && (
                        <form className="flex gap-2 mb-4" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="text"
                                value={comment}
                                onChange={({ target }) => setComment(target.value)}
                                className="text-black w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700"
                                placeholder="Add comment..."
                            />
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="flex justify-center items-center bg-gray-600 text-white rounded-sm py-2 px-4 hover:bg-gray-500"
                            >
                                Add
                            </button>
                        </form>
                    )}
                    {coments &&
                        coments.map((coment) => <ComentItem key={coment._id} {...coment} />)}
                </div>
            </div>
        </div>
    );
};

export default PostPage;

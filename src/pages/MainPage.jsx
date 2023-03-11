import React, { useEffect } from "react";
import PostItem from "../components/PostItem";
import PopularPosts from "../components/PopularPosts";
import { useDispatch, useSelector } from "react-redux";
import { SelectPosts, getAllPosts } from "../redux/features/post/postSlice";
import { Link } from "react-router-dom";

const MainPage = () => {
    const dispatch = useDispatch();

    const { posts, popularPosts } = useSelector(SelectPosts);

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);

    if (!posts.length) {
        return <div className="text-xl text-center text-white py-10">Posts data is empty</div>;
    }

    return (
        <div className="max-w-[900px] mx-auto py-10">
            <div className="flex justify-between gap-8 ">
                <div className="flex flex-col gap-10 basis-4/5">
                    {posts && posts.map((post) => <PostItem key={post._id} {...post} />)}
                </div>
                <div className="basis-1/5">
                    <div className="text-xs uppercase text-white">Popular:</div>
                    {popularPosts?.map((post) => (
                        <Link key={post._id} to={`/${post._id}`}>
                            <PopularPosts {...post} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainPage;

import React, { useEffect, useState } from "react";
import axios from "../utils/axios";

import PostItem from "../components/PostItem";

const PostsPage = () => {
    const [posts, setPosts] = useState([]);

    const fetchMyPosts = async () => {
        try {
            const { data } = await axios.get(`posts/user/me`);
            setPosts(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMyPosts();
    }, []);

    if (!posts) {
        return <div className="text-xl text-center text-white py-10">You don't have any posts</div>;
    }

    return (
        <div className="w-1/2 mx-auto py-10 flex flex-col gap-10">
            {posts && posts.map((post) => <PostItem key={post._id} {...post} />)}
        </div>
    );
};

export default PostsPage;

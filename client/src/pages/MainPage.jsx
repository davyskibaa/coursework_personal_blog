import React, {useEffect} from 'react'
import {PostItem} from "../components/PostItem";
import {PopularPost } from "../components/PopularPost"
import {useDispatch, useSelector} from "react-redux";
import {getAllPosts} from "../redux/features/post/postSlice";

export const MainPage = () => {
    const dispatch = useDispatch()
    const { posts, popularPosts } = useSelector((state) => state.post)

    useEffect(() => {
        dispatch(getAllPosts())
    }, []);

    if(!posts.length) {
        return <div>Загрузка...</div>
    }

    return <div className="container mt-3 w-75">
        <div className="row">
            <div className="col lg-5 text-break">
                {posts?.map((post, idx) => <PostItem key={idx} post={post}/>)}
            </div>
            <div className="col-lg-3">
                <div className="border rounded">
                    <div className="bg-light border-bottom py-2 px-3 rounded-top">
                        <b>Популярные посты</b>
                    </div>
                    <div className="px-3 pt-2">
                        {popularPosts?.map((post, idx) => <PopularPost key={idx} post={post}/>)}
                    </div>
                </div>

            </div>
        </div>
    </div>
}
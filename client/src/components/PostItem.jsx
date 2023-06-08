import React, {useState} from "react"
import Moment from "react-moment"
import {Link} from "react-router-dom";

export const PostItem = ({ post }) => {
    if(!post) {
        return <div>Загрузка...</div>
    }

    const ReadMore = ({ children }) => {
        const text = children;
        const [isReadMore, setIsReadMore] = useState(true);

        const toggleReadMore = () => {
            setIsReadMore(!isReadMore);
        }

        return (
            <p className="text">
                {isReadMore ? text.slice(0, 150) : text}
                <span onClick={toggleReadMore} className="read-or-hide text-primary">
                    {isReadMore ? "...  читать далее" : " show less"}
                </span>
            </p>
        )
    }

    return <Link className="text-decoration-none text-reset" to={`/${post._id}`}>
        <div className="flex mb-3 border rounded">
            <div className={post.imgUrl ? 'img-container' : 'h-0'}>
                {post?.imgUrl && (
                    <img className="rounded-top"
                         style={{
                             display: 'block',
                             width: '100%',
                             height: '300px',
                             'object-fit': "cover"
                         }}
                         src={`http://localhost:5555/${post.imgUrl}`} alt=""/>
                )}
            </div>
            <div className="px-3 py-2">
                <div className="text-secondary"><Moment date={post.createdAt} format='DD.MM.YYYY'/></div>
                <h3 className="p-0 m-0"><b>{post.title}</b></h3>
                <ReadMore>{post.text}</ReadMore>
                <div>
                    <button className="bg-transparent border-0 px-0"><i className="bi bi-eye"/> {post.views}</button>
                    <button className="bg-transparent border-0 px-3"><i className="bi bi-chat-left-dots"/> {post.comments?.length || 0}</button>
                </div>
            </div>
        </div>
    </Link>
}
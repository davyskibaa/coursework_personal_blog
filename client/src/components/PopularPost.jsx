import React from "react"
import {Link} from "react-router-dom";

export const PopularPost = ({post}) => {
    return <div className="mb-3">
        <Link className="text-decoration-none text-reset" to={`${post._id}`}> {post.title} </Link>
    </div>
}
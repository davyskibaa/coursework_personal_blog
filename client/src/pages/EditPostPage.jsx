import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import axios from "../utils/axios";
import {updatePost} from "../redux/features/post/postSlice";

export const EditPostPage = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [oldImage, setOldImage] = useState('')
    const [newImage, setNewImage] = useState('')
    const params = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchPost = useCallback(async() => {
        const {data} = await axios.get(`/posts/${params.id}`)
        setTitle(data.title)
        setText(data.text)
        setOldImage(data.imgUrl)
    }, [params.id])

    const submitHandler = () => {
        try {
            const updatedPost = new FormData()
            updatedPost.append('title', title)
            updatedPost.append('text', text)
            updatedPost.append('id', params.id)
            updatedPost.append('image', newImage)
            dispatch(updatePost(updatedPost))
            navigate(`/${params.id}`)
        } catch (err) {
            console.log(err)
        }
    }

    const clearFormHandler = () => {
        setText('')
        setTitle('')
        navigate(`/${params.id}`)
    }

    useEffect(() => {
        fetchPost()
    }, [fetchPost]);

    return <div className="col-md-5 mx-auto mt-1">
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="custom-file mb-3">
                <label className="form-label" >Прикрепить изображение</label>
                <input className="form-control" type="file" onChange={(e) => {
                    setNewImage(e.target.files[0])
                    setOldImage('')
                }}>
                </input>
            </div>
            <div className="custom-file mb-3">
                { oldImage && <img className="form-control" src={`http://localhost:5555/${oldImage}`} alt={oldImage.name}></img> }
                { newImage && <img className="form-control" src={URL.createObjectURL(newImage)} alt={newImage.name}></img> }
            </div>
            <div className="mb-3">
                <label className="form-label">Заголовок поста </label>
                <input  className="form-control" type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
            </div>
            <div className="mb-3">
                <label className="form-label">Текст поста</label>
                <textarea className="form-control" rows="5" value={text} onChange={(e) => setText(e.target.value)}></textarea>
            </div>

            <button className="btn btn-primary" onClick={submitHandler}>Сохранить</button>
            <button className="btn btn-outline-primary" onClick={clearFormHandler}>Отменить</button>
        </form>
    </div>
}
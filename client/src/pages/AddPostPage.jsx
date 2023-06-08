import React, { useState } from 'react'
import {useDispatch} from "react-redux";
import {createPost} from "../redux/features/post/postSlice";
import {useNavigate} from "react-router-dom";

export const AddPostPage = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [image, setImage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = () => {
        try {
            const data = new FormData()
            data.append('title', title)
            data.append('text', text)
            data.append('image', image)
            dispatch(createPost(data))
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    const clearFormHandler = () => {
        setText('')
        setTitle('')
        setImage('')
        navigate('/')
    }

    return <div className="col-md-5 mx-auto mt-1">
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="custom-file mb-3">
                <label className="form-label" >Прикрепить изображение</label>
                <input className="form-control" type="file" onChange={(e) => setImage(e.target.files[0])}></input>
            </div>
            <div className="custom-file mb-3">
                { image && <img className="form-control" src={URL.createObjectURL(image)} alt={image.name}></img> }
            </div>
            <div className="mb-3">
                <label className="form-label">Заголовок поста </label>
                <input  className="form-control" type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
            </div>
            <div className="mb-3">
                <label className="form-label">Текст поста</label>
                <textarea className="form-control" rows="5" value={text} onChange={(e) => setText(e.target.value)}></textarea>
            </div>

            <button className="btn btn-primary" onClick={submitHandler}>Добавить</button>
            <button className="btn btn-outline-primary" onClick={clearFormHandler}>Отменить</button>
        </form>
    </div>
}
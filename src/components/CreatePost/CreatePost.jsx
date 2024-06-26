import axios from '../../apiClient.js'
import styleCreate from './CreatePost.module.scss'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import slugify from 'slugify';
import { MdArrowBackIosNew } from "react-icons/md";

export default function EditPost() {
    const Api = import.meta.env.VITE_API_URL
    const { slug } = useParams();
    const navigate = useNavigate();

    const token = localStorage.getItem('token');


    const [post, setPost] = useState({});
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState({
        title: '',
        content: '',
        published: false,
        categoryId: '',
        Tag: [],
        image: null
    });

    useEffect(() => {

        async function fetchTags() {
            try {
                const response = await axios.get(`${Api}/tags`)
                setTags(response.data)
            } catch (error) {
                console.error(error)
            }
        }

        async function fetchCategories() {
            try {
                const response = await axios.get(`${Api}/category`)
                setCategories(response.data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchTags();
        fetchCategories();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append('published', data.published);
        formData.append('categoryId', data.categoryId);
        formData.append('tags', JSON.stringify(data.Tag.map(tag => tag.id)));
        if (data.image instanceof File) {
            formData.append('image', data.image);
        }

        const newSlug = slugify(data.title);

        try {
            await axios.post(`${Api}/posts/${slug}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            window.location.href = `/post/${newSlug}`;
        } catch (error) {
            console.error(error);
        }
    }

    const handleTagChange = (tag) => {
        setData(d => {
            const tagExists = d.Tag.some(t => t.id === tag.id);
            if (tagExists) {
                return { ...d, Tag: d.Tag.filter(t => t.id !== tag.id) };
            } else {
                return { ...d, Tag: [...d.Tag, tag] };
            }
        });
    };

    const handleBack = () => {
        navigate(-1);
    }

    const updateData = (key, newValue) => {
        setData(d => ({ ...d, [key]: newValue }));
    };

    return (
        <div className="container">
            <div className="row mt-5 text-white justify-content-center">

                <div className="col-8 text-white mb-5 d-flex justify-content-between align-items-center">
                    <h1 className="fw-bold flex-wrap w-75">Create new Post</h1>
                    <MdArrowBackIosNew className={`${styleCreate.buttons}`} onClick={handleBack} />
                </div>

                <div className="col-8 text-white pb-4">
                    <form onSubmit={handleSubmit} encType='multipart/form-data'>

                        <div className="mb-3">
                            <label htmlFor="title" className="form-label fs-5 fw-medium d-block">Title</label>
                            <input
                                type="text"
                                className={`${styleCreate.input}`}
                                id="title"
                                value={data.title}
                                onChange={(e) => updateData('title', e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="image" className="form-label fs-5 fw-medium d-block">Image</label>
                            {data.image && (
                                <img src={`http://localhost:3000/uploads/posts/${data.image}`} alt="" className='img-fluid mb-3' />
                            )}
                            <input
                                type="file"
                                name="image"
                                className={`${styleCreate.input}`}
                                id="image"
                                onChange={(e) => updateData('image', e.target.files[0])}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="content" className='form-label fs-5 fw-medium d-block'>Content</label>
                            <textarea
                                className={`${styleCreate.input} ${styleCreate.content_input}`}
                                id="content"
                                rows="10"
                                value={data.content}
                                onChange={(e) => updateData('content', e.target.value)}
                            ></textarea>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="category" className="form-label fs-5 fw-medium d-block">Category</label>
                            <select
                                name="category"
                                id="category"
                                className={`${styleCreate.input}`}
                                value={data.categoryId}
                                onChange={e => updateData('categoryId', e.target.value)}
                            >
                                <option value="">Seleziona una categoria</option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="tags" className='form-label fs-5 fw-medium d-block'>Tags:</label>
                            <div className="d-flex gap-3 flex-wrap">

                                {tags.map((tag) => (
                                    <div key={tag.id}>
                                        <input
                                            type="checkbox"
                                            id={tag.id}
                                            checked={data.Tag.some(t => t.id === tag.id)}
                                            onChange={() => handleTagChange(tag)}
                                        />
                                        <label htmlFor={tag.id}>{tag.name}</label>
                                    </div>
                                ))}

                            </div>
                        </div>

                        <div className="mb-3 d-flex gap-3 align-items-center">
                            <label htmlFor="published" className="form-label fs-5 fw-medium">Published</label>
                            <input
                                type="checkbox"
                                id="published"
                                checked={data.published}
                                onChange={(e) => updateData('published', e.target.checked)}
                            />
                        </div>

                        <button type="submit" className="btn btn-outline-success w-100">Update Post</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

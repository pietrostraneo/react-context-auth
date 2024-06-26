import postStyle from './PostDetails.module.scss'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { MdEditNote, MdDelete, MdArrowBackIosNew } from "react-icons/md";
import axios from '../../apiClient.js'

export default function PostDetails() {
    const { slug } = useParams()
    const [post, setPost] = useState(null)

    const navigate = useNavigate();

    const userData = localStorage.getItem('user')
    const user = userData ? JSON.parse(userData) : null

    const handleBack = () => {
        navigate(`/`);
    }

    const handleEdit = () => {
        navigate(`/edit/${slug}`);
    }


    useEffect(() => {
        async function fetchPost() {
            try {
                let response = await axios.get(`http://localhost:3000/posts/${slug}`);
                let { data } = response.data;
                setPost(data);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        }

        fetchPost()

    }, [slug])

    function getFormattedDate(p) {
        const date = new Date(p.createdAt)
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
        return formattedDate
    }

    async function deletePost(slug) {
        try {
            await axios.delete(`http://localhost:3000/posts/${slug}`,);
            window.location.href('/');
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    }

    return (
        <>
            {post && (
                <>
                    <div className="container">
                        <div className="row mt-5 justify-content-center text-white">

                            <div className="col-12 col-md-8 pb-5">
                                <article>

                                    <section className='d-flex justify-content-between'>
                                        <div className="titles">
                                            <h2 className={`fw-bold`}>{post.title}</h2>
                                            <p className={`${postStyle.sub_color}`}>by {post.User.username}</p>
                                            <p className={`${postStyle.sub_color}`}>{getFormattedDate(post)}</p>
                                        </div>

                                        <div className="buttons d-flex gap-2">
                                            <MdArrowBackIosNew className={`${postStyle.buttons}`} onClick={handleBack} />
                                            {user && post.User.username === user.username && (<>

                                                <MdEditNote onClick={handleEdit} className={`${postStyle.buttons}`} />
                                                <MdDelete onClick={() => deletePost(post.slug)} className={`${postStyle.buttons}`} />
                                            </>
                                            )}
                                        </div>
                                    </section>

                                    <figure>
                                        <img src={post.image ? `http://localhost:3000/uploads/posts/${post.image}` : `${post.image}`} alt={post.title} className='img-fluid' />
                                    </figure>

                                    <section>
                                        <p>{post.content}</p>
                                    </section>
                                </article>

                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

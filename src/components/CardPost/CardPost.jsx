import postStyle from './CardPost.module.scss'
import feedStyle from '../Feed/Feed.module.scss'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function CardPost({ p }) {
    const [saved, setSaved] = useState(() => {
        // Recupera i post salvati dallo `localStorage` all'inizializzazione
        const savedPosts = localStorage.getItem('saved');
        return savedPosts ? JSON.parse(savedPosts) : [];
    });

    useEffect(() => {
        // Aggiorna `localStorage` quando `saved` cambia
        localStorage.setItem('saved', JSON.stringify(saved));
    }, [saved]);

    const handleSave = (p) => {
        if (!saved.includes(p.id)) {
            setSaved((prevSaved) => [...prevSaved, p.id]);
        } else {
            setSaved((prevSaved) => prevSaved.filter((id) => id !== p.id));
        }
    };

    return (
        <div className={`col-12 col-md-8 d-flex mb-5 ${feedStyle.post_feed}`}>
            <div className="img me-4">
                <img src={p.image ? `http://localhost:3000/uploads/posts/${p.image}` : `${p.image}`} alt="" className={`${feedStyle.poster}`} />
            </div>
            <div className={feedStyle.summary}>
                <h4>{p.title}</h4>
                <p className="text-secondary-emphasis mt-2">{p.content.substring(0, 100)}...</p>
                <div className={`d-flex align-items-center mt-3 gap-3`}>
                    {p.published ? (
                        <>
                            <Link to={`/post/${p.slug}`}><button className="btn btn-outline-success p-1">Read more</button></Link>
                            <i className={`fas fa-bookmark ${feedStyle.fa_bookmark} ${saved.includes(p) ? 'text-danger' : ''}`} onClick={() => {
                                handleSave(p)
                            }}></i>
                        </>
                    ) : (<p>Not published yet</p>)}

                </div>
            </div>
        </div >
    )
}
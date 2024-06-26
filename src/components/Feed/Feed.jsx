import React, { useEffect, useState } from 'react';
import feedStyle from './Feed.module.scss';
import Jumbotron from '../Jumbotron/Jumbotron.jsx'
import Tag from '../Tag/Tag.jsx'
import Loader from '../Loader/Loader.jsx';
import axios from 'axios';

const Api = import.meta.env.VITE_API_URL;

import CardPost from '../CardPost/CardPost';

export default function Feed() {
    const [post, setPost] = useState([]);

    useEffect(() => {
        async function fetchPost() {
            try {
                let response = await axios.get(`${Api}/posts`);
                let { data } = response.data;
                let publishedPost = data.filter(d => d.published === true)
                setPost(publishedPost);
            } catch (error) {
                console.error('Errore durante il fetch dei post:', error);
            }
        }

        fetchPost();
    }, []);

    return (
        <>

            <Jumbotron />

            <Tag />

            <div className="container slide-in-bottom">
                <div className="row mt-4 justify-content-center text-white">

                    <div className="col-12 col-md-8 mb-4">
                        <h3>Latest Post</h3>
                    </div>


                    {post.length > 0 ? (
                        post.map((p, index) => (
                            <CardPost key={index} p={p} />
                        ))
                    ) : (
                        <div className="col-12 col-md-8 mt-5 d-flex justify-content-center">
                            <Loader />
                        </div>
                    )
                    }

                </div>
            </div>

        </>

    );
}

import React, { useEffect, useState } from 'react';
import axios from 'axios'
import tagStyle from './Tag.module.scss'

export default function Tag() {

    const Api = import.meta.env.VITE_API_URL;

    const [tag, setTag] = useState([]);

    useEffect(() => {
        async function fetchTag() {
            try {
                let response = await axios.get(`${Api}/tags`);
                let data = response.data;
                setTag(data);
            } catch (error) {
                console.error('Errore durante il fetch dei Tag:', error);
            }
        }

        fetchTag();
    }, []);

    return (
        <>
            <div className="container">
                <div className="row mt-4 justify-content-center text-white">
                    <div className="col-12 col-md-8 mb-4">
                        <h3>Tags</h3>
                    </div>
                    {tag.length > 0 ? (
                        <>
                            <div className="col-12 col-md-8 d-flex gap-4">
                                {tag.map((item, index) => (
                                    <span key={index} className={tagStyle.tag}>{item.name}</span>
                                )
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <p>Tags not available</p>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
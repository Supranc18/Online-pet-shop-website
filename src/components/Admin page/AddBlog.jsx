import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

export default function AddBlog() {
    const prams = useParams()

    const [productValue, setProductValue] = useState({
        topic: "",
        explain: "",
        image: ""
    })

    const [buttonDisable, setButtonDisable] = useState(false)

    useEffect(() => {
        if (prams.slug) {
            axios.get(`http://localhost:8000/api/blog/${prams.slug}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then((res) => {
                    setProductValue(res.data)
                })
        }
    }, [prams.slug]) // Add prams.slug as a dependency

    function changehandle(e) {
        const { name, value } = e.target;
        setProductValue(prevValue => ({
            ...prevValue,
            [name]: value,
        }));
    }

    let productImage = ""
    if (productValue.image) {
        if (typeof (productValue.image) === "string") {
            productImage = productValue.image
        } else {
            productImage = URL.createObjectURL(productValue.image)
        }
    }

    function submithandel(e) {
        e.preventDefault()
        setButtonDisable(true)
        let token = localStorage.getItem('token')
        const formData = new FormData();
        formData.append('topic', productValue.topic);
        formData.append('explain', productValue.explain);
        if (e.target.img.files[0]) {
            formData.append('image', e.target.img.files[0]);
        }

        let method = "post"
        let url = "http://localhost:8000/api/blog"

        if (prams.slug) {
            method = "put"
            url = `http://localhost:8000/api/blog/${prams.slug}`
        }

        axios({
            method,
            url,
            data: formData,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (prams.slug) {
                    setButtonDisable(false)
                    toast.success("Blog updated successfully");
                } else {
                    setButtonDisable(false)
                    toast.success("Blog added successfully");
                }
            })
            .catch((error) => {
                if (error.response) {
                    setButtonDisable(false)
                    if (error.response.status === 400) {
                        toast.error("Blog addition failed");
                        setButtonDisable(false)
                    }
                }
            })
    }

    return (
        <div className='flex items-center h-[100%] mt-5 justify-center'>
            <form onSubmit={submithandel} className='flex flex-col gap-3 bg-slate-400 p-10 rounded-2xl'>
                <label htmlFor="topic">Blog Topic</label>
                <input
                    onChange={changehandle}
                    type="text"
                    name="topic"
                    value={productValue.topic} // Use productValue directly
                />


                <label htmlFor="explain">Description</label>
                <textarea
                    rows="10"
                    cols='50'
                    name="explain"
                    value={productValue.explain} // Use productValue directly
                    onChange={changehandle}
                />

                <label>Image</label>
                <input type="file" name="img" accept="image/*" />

                <img className="h-20" src={productImage} alt="Product Preview" />

                <button disabled={buttonDisable} className='disabled:cursor-no-drop border border-black py-2'>
                    {prams.slug ? 'Update' : 'Submit'}
                </button>
            </form>

        </div>
    )
}

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

export default function AdminAddProduct() {
  const prams = useParams()

  const [productValue, setProductValue] = useState({
    name: "",
    gender: "",
    price: "",
    in_stock: "",
    description: "",
    image: ""
  })

  const [buttonDisable, setButtonDisable] = useState(false)

  useEffect(() => {
    if (prams.slug) {
      axios.get(`http://localhost:8000/api/product/${prams.slug}`,{
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
    formData.append('name', productValue.name);
    formData.append('price', productValue.price);
    formData.append('in_stock', productValue.in_stock);
    formData.append('gender', productValue.gender);
    formData.append('description', productValue.description);
    if (e.target.img.files[0]) {
      formData.append('image', e.target.img.files[0]);
    }

    let method = "post"
    let url = "http://localhost:8000/api/product"

    if (prams.slug) {
      method = "put"
      url = `http://localhost:8000/api/product/${prams.slug}`
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
          toast.success("Product updated successfully");
        } else {
          setButtonDisable(false)
          toast.success("Product added successfully");
        }
      })
      .catch((error) => {
        if (error.response) {
          setButtonDisable(false)
          if (error.response.status === 400) {
            toast.error("Product addition failed");
            setButtonDisable(false)
          }
        }
      })
  }

  return (
    <div className='flex items-center h-[100%] mt-5 justify-center'>
     <form onSubmit={submithandel} className='flex flex-col gap-3 bg-slate-400 p-10 rounded-2xl'>
  <label htmlFor="name">Bread name</label>
  <input
    onChange={changehandle} 
    type="text" 
    name="name" 
    value={productValue.name} // Use productValue directly
  />

  <label htmlFor="price">Price</label>
  <input
    onChange={changehandle} 
    type="number" 
    name='price' 
    value={productValue.price} // Use productValue directly
  />

  <label htmlFor="gender">Gender</label>
  <select 
    name="gender" 
    id="gender" 
    value={productValue.gender} // Use productValue directly
    onChange={changehandle}
  >
    <option value="">--</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
  </select>

  <label htmlFor="stock">In stock</label>
  <input
    onChange={changehandle} 
    type="number" 
    name='in_stock' 
    value={productValue.in_stock} // Use productValue directly
  />

  <label htmlFor="description">Description</label>
  <textarea 
    name="description" 
    value={productValue.description} // Use productValue directly
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

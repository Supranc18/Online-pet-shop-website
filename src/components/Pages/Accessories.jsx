import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiCart } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setcart } from '../../redux/slice/cartSlice';


export default function Accessories() {
  const [product, setProduct]=useState([])
  const baseURL = 'http://localhost:8000';
  const dispatch =useDispatch()
 
  function cartHandle(el) {
    dispatch(setcart(el))
    toast.success("added to cart sucessfully")
    
  }

  useEffect(() => {
    axios.get("http://localhost:8000/api/acessories")
      .then((response) => {
        setProduct(response.data);

      })
  }, [])
  return (
    <>
    <div>
    <div className='container my-10 flex gap-20 flex-wrap'>
        {product.map((el)=>{
            return<>
            <div key={el._id} className='bg-[#dedee5] p-4 rounded-md font-[600]'>
                <img src={`${baseURL}${el.image}`} alt=""
                className='w-[200px] h-[200px]  overflow-hidden rounded-md'  />
                
                <p>{el.name}</p>
                <div className='flex justify-between'>
                <p>Rs.{el.price}</p>
                <button onClick={()=>{cartHandle(el)}}><BiCart className='text-[1.5rem] bg-[green] rounded-full text-white p-1'/></button>
                </div>

            </div>
            </>
        })}
    </div>
    </div>
    </>
  )
}

import React, { useEffect } from 'react'
import { BiCart } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux'
import { setcart } from '../../redux/slice/cartSlice';
import { toast } from 'react-toastify';

export default function Bread() {
    const baseURL = 'http://localhost:8000';
    const dispatch =useDispatch()

    const reduxcart = useSelector((store) => store.cart.value)

    let reduxProduct = useSelector((store) => {
        return store.product.value
      })
      

      function cartHandle(el) {
        dispatch(setcart(el))
        toast.success("added to cart sucessfully")
        
      }
      useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(reduxcart));
    }, [reduxcart]);
      
  return (
    <>
    <div>
    <div className='container my-10 flex gap-20 flex-wrap'>
        {reduxProduct.map((el)=>{
            return<>
            <div key={el._id} className='bg-[#dedee5] p-4 rounded-md font-[600]'>
                <img src={`${baseURL}${el.image}`} alt=""
                className='w-[200px] h-[200px]  overflow-hidden rounded-md'  />
                
                <p>{el.name}</p>
                <p>Gender: {el.gender}</p>
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

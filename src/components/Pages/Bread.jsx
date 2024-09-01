import React, { useEffect } from 'react'
import { BiCart } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux'
import { setcart } from '../../redux/slice/cartSlice';
import { toast } from 'react-toastify';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Bread() {
  const baseURL = 'http://localhost:8000';
  const dispatch = useDispatch()

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
  
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    appendDots: dots => (
      <ul style={{ margin: "0px" }}> {dots} </ul>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "30px",
          color: "black",
          border: "1px solid black",
          borderRadius: "50%",
          padding: "5px",
          textAlign: "center",
        }}
      >
        {i + 1}
      </div>
    ),
  };
  
  return (
    <>
    <div className='my-10'>
      <Slider {...settings}>
        <div>

          <div className='container my-10 flex gap-20 flex-wrap'>
            {reduxProduct.map((el) => {
              return <>

                <div key={el._id} className='bg-[#dedee5] p-4 rounded-md font-[600]'>
                  <img src={`${baseURL}${el.image}`} alt=""
                    className='w-[200px] h-[200px]  overflow-hidden rounded-md' />

                  <p>{el.name}</p>
                  <p>Gender: {el.gender}</p>
                  <div className='flex justify-between'>
                    <p>Rs.{el.price}</p>
                    <button onClick={() => { cartHandle(el) }}><BiCart className='text-[1.5rem] bg-[green] rounded-full text-white p-1' /></button>
                  </div>

                </div>

              </>

            })}
          </div>
        </div>
      </Slider>
      </div>
    </>
  )
}

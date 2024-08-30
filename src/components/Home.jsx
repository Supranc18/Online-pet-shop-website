import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


export default function Home() {
  const [dogs, setDogs] = useState([])
  const baseURL = 'http://localhost:8000';
  const navigat =useNavigate()

  
  useEffect(() => {
    axios.get("http://localhost:8000/api/product")
      .then((response) => {
        setDogs(response.data);

      })
  }, [])

  function clickHandle(el) {
   navigat("/bread")
  }

  return (
    <>
      <div >
        <div className='relative h-[25vh]  md:h-[40vh] lg:h-[130vh]'>
          <div className='absolute inset-0 z-10'>
            <img src="/background.jpg" className='w-[100%]' alt="Background" />
          </div>
          <div className='flex justify-center items-end flex-col pr-10 z-20 relative'>
            <div className='flex flex-col items-start md:gap-6 w-[50%] md:mt-24'>
              <p className='md:text-[2rem] font-bold'>Every body Needs A Friend in Life.</p>
              <p className='w-[90%] text-[0.5rem] md:text-[1rem]'>
                The Maltipoo is a cross between a Maltese and a Poodle, another hybrid breed in the recently popular category of doodle dogs.
                Alert and active, the Maltese Poodle mix is known for their adorable appearance, friendly disposition, and hypoallergenic coat.
              </p>
              <button type='button' className='bg-[#f8f8b1] px-4 py-2 rounded-xl text-[0.5rem] md:text-[1rem]'>Buy Me</button>
            </div>
          </div>
        </div>
        <div className=' container flex justify-center flex-col items-center my-10 gap-5'>
          <p className='text-[2rem] font-[700]'>Dog Breed</p>
          <p>Find yourself a pereet friend from a wide variety of choices.</p>
          <div className='flex gap-5 flex-wrap'  >
            {dogs.map((el) => {
              return <>
                <div key={el._id} className='flex flex-col items-center cursor-pointer gap-2'
                onClick={(()=>{clickHandle(el)})}>
                  <img src={`${baseURL}${el.image}`} alt={el.name}
                  className='w-[100px] h-[100px] rounded-full' />
                  <p className='font-[600] text-[1.2rem]'>{el.name}</p>
                </div>
              </>
            })}
          </div>
        </div>

        <div className='flex flex-col lg:flex-row my-10 container gap-5'>
          <div className='flex flex-col items-start gap-10'>
            <h1 className='text-[2rem] font-[700]'> Pet Products</h1>
            <p>All product are designed for ease of use and durable, as well as looking good. You can choose your own color to make your item unique.</p>
            <button type='butten' className='bg-[#e6a721] text-white px-4 py-2 rounded-2xl'> <Link to={'/accessories'}>See more</Link></button>
          </div>
          <div className='flex flex-wrap gap-4'>
            <img src="./product-1.jpg" alt="" className='  w-[140px] h-[140px] overflow-hidden' />
            <img src="./product-2.jpg" alt="" className='  w-[140px] h-[140px] overflow-hidden' />
            <img src="./product-3.jpg" alt="" className='  w-[140px] h-[140px] overflow-hidden' />
            <img src="./product-4.jpg" alt="" className='w-[140px] h-[140px]overflow-hidden' />
            <img src="./product-5.jpg" alt="" className='  w-[140px] h-[140px] overflow-hidden' />
            <img src="./product-6.jpg" alt="" className='  w-[140px] h-[140px] overflow-hidden' />

          </div>
        </div>
      </div>



    </>
  )
}

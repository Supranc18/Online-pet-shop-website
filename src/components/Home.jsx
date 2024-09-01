import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { HiArrowLongLeft, HiArrowLongRight} from 'react-icons/hi2';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import { IoIosArrowRoundDown } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useDispatch } from 'react-redux';
import { setblog } from '../redux/slice/blogSlice';

export default function Home() {
  const [dogs, setDogs] = useState([])
  const [blog, setBlog]= useState([])
  const baseURL = 'http://localhost:8000';
  const navigat =useNavigate()
  const dispatch = useDispatch()


  useEffect(() => {
    axios.get("http://localhost:8000/api/product")
      .then((response) => {
        setDogs(response.data);

      })
  }, [])

  useEffect(() => {
    axios.get("http://localhost:8000/api/blog")
      .then((response) => {
        setBlog(response.data);

      })
  }, [])

  function clickHandle(el) {
   navigat("/bread")
  }

  function blogHandle(el) {    
    dispatch(setblog(el))
    navigat('/blog')
    
  }

  return (
    <>
      <div >
        <div className='relative h-[685px]    '>
          <div className='absolute inset-0 z-10'>
            <img src="/background.jpg" className='w-[100%] h-[605px]' alt="Background" />
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
          <div className='absolute inset-0 z-10 flex container justify-between items-end mb-[80px]'>
            <div className='flex items-center gap-14'>
              <HiArrowLongLeft className='text-[1.5rem]'/>
               <p className='text-[1.2rem]'>Golden retriever</p>
               <HiArrowLongRight className='text-[1.5rem]'  />
            </div>
            <div className='flex gap-3 mb-4'>
            <FaFacebook className='text-[1.2rem] text-[blue]'/>
            <FaYoutube className='text-[1.2rem] text-[red]'/>
            <FaInstagram className='text-[1.2rem] text-[#f8889b]'/>
            </div>

          </div>
          <div className='absolute inset-0 z-10 flex justify-center items-end'>
          <ScrollLink to="footer" smooth={true} offset={200} duration={600}>
          <IoIosArrowRoundDown className='cursor-pointer text-[70px] font-light bg-[#ededed] rounded-full mb-10 '/>
          </ScrollLink>
            
         
          </div>
        </div>
        <div className=' container flex justify-center flex-col items-center my-10 gap-10'>
          <p className='text-[2rem] font-[700]'>Dog Breed</p>
          <p>Find yourself a pereet friend from a wide variety of choices.</p>
          <div className='flex gap-5 flex-wrap'  >
            {dogs.map((el) => {
              return <>
                <div key={el._id} className='flex flex-col items-center cursor-pointer gap-3'
                onClick={(()=>{clickHandle(el)})}>
                  <img src={`${baseURL}${el.image}`} alt={el.name}
                  className='w-[100px] h-[100px] rounded-full' />
                  <p className='font-[600] text-[1.2rem]'>{el.name}</p>
                </div>
              </>
            })}
          </div>
        </div>

        <div className='flex flex-col lg:flex-row my-[120px] container gap-5'>
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

       
        <div className='container  flex flex-col items-center gap-5 '>
          <p className='text-[1.9rem] font-[800]'>Blog Section</p>
          <p>Description of blog</p>
          <div className='flex gap-5 flex-wrap '  >
            {blog.map((el) => {
              return <>
                <div key={el._id} className='  bg-[#f3f3fc]  flex flex-col items-center gap-3 rounded-xl cursor-pointer'
                onClick={(()=>{blogHandle(el)})}>
                  <img src={`${baseURL}${el.image}`} alt='dog'
                  className='w-[220px] h-[220px] rounded-xl ' />
                  <p className='font-[600] text-[1rem] text-center w-[200px] mb-10'>{el.topic}</p>
                </div>
              </>
            })}
          </div>
      


        </div>

        <div className='bg-[#FEC23E] container rounded-2xl my-[120px] flex items-center gap-10'>
          <div>
            <img src="./dog.png" alt="dog" 
            className='max-w-[420px]'/>
          </div>

          <div className='max-w-[350px] flex flex-col gap-5  items-start'>
            <p className='text-[1.8rem] font-[700]'>Get pawsome News!</p>
            <p className='text-[1.2rem]'>Exclusive  training tips, trick, products deals and more.</p>
            <input type="email" name='email' placeholder='Enter email..' 
            className='p-2 rounded-2xl '/>
            <button className='bg-[#d7961d] text-white px-4 py-2 rounded-2xl'>Susbcribe</button>
          </div>
        </div>


      </div>



    </>
  )
}

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';


export default function BlogHome() {

  const [blog, setBlog] = useState([])
  const baseURL = 'http://localhost:8000';
  const reduxBlog = useSelector((store) => store.blog.value)
  console.log(reduxBlog);



  useEffect(() => {
    axios.get("http://localhost:8000/api/blog")
      .then((response) => {
        setBlog(response.data);

      })
  }, [])

  return (
    <>
      <div>

        <div className='container flex flex-col items-center gap-5 my-10'>
          {reduxBlog.map((el) => {
            return <>
              <img src={`${baseURL}${el.image}`} alt=""
                className='max-w-[800px]' />
              <p className='text-[2rem] font-[700]'>{el.topic}</p>
              <p>{el.explain}</p>
            </>
          })}
        </div>

        <div className='container my-10 flex gap-5 flex-wrap'>
          {blog.map((el) => {
            return <>
              <div key={el._id} className='  bg-[#f3f3fc]  flex flex-col items-center gap-2 rounded-xl cursor-pointer'
                >
                <img src={`${baseURL}${el.image}`} alt='dog'
                  className='w-[220px] h-[220px] rounded-xl ' />
                <p className='font-[600] text-[1rem] text-center w-[200px] mb-10'>{el.topic}</p>
              </div>

            </>
          })}
        </div>
      </div>
    </>

  )
}

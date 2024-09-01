import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Blog() {
  
  const [products, setProducts] = useState([])
  const [deleteConfirm, setDeleteConfirm]=useState(false)
  const[producttoDelete, setProducttoDelete]=useState(null)

  const fetchProducts = () => {
    axios.get('http://localhost:8000/api/blog', {})
      .then((response) => {
        setProducts(response.data)

      })
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  function deleteHandle(productId) {
    setDeleteConfirm(true)
    setProducttoDelete(productId)
    }
    
    function deleteConfirmHandle() {
      if (producttoDelete) {
        axios.delete(`http://localhost:8000/api/blog/${producttoDelete._id}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
        )
    .then((res)=>{
      fetchProducts()
      setDeleteConfirm(false)
      toast("Blog deleted sucessfully")
    
    })  
    .catch(error => {
    if (error.response) {
      console.error('Error status:', error.response.status);
      console.error('Error details:', error.response.data);
    } else {
      console.error('Error message:', error.message);
    }
  });
      
    }

  }


  return (
    <>
     {deleteConfirm ?( <div className='flex  justify-center items-center h-[100vh] '>
      <div className='bg-[#e8e8e8] w-[300px] flex flex-col justify-center items-center h-[150px]  rounded-md'>
        <div>
          <p>Do you really want to delete this product?</p>
        </div>
        <div className='flex justify-between w-[100%] px-12 pt-8'>
      <button onClick={deleteConfirmHandle}  className='border border-black px-2'>yes</button>
      <button onClick={() => setDeleteConfirm(false)}  className='border border-black px-2'>No</button>
      </div>
    </div>
    </div>):(
      <table className='border border-black  my-20  w-[900px]'>
      <thead className='border  border-black '>
        <tr>
        <th className='border  border-black'>Blog Topic</th>
        <th className='border  border-black'>edit/delete</th>
        </tr>
      </thead>
      <tbody  className= 'border  border-black'>
      {products.map((el) => {
        return  <tr key={el._id}>
          <td className= 'border  border-black text-center'>{el.topic}</td>
          <td className= 'border  border-black text-center text-primary'>
           <Link to={`edit/${el._id}`}> <button>edit</button></Link>
            /
            <button onClick={()=>{deleteHandle(el)}}>delete</button>
          </td>
          </tr>
        

      })}
       </tbody>
    </table >
    )}
      
    
    </>
  )
}

import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


export default function Signin() {
    const [fieldError, setFieldError] = useState({})
    const [submitDisable, setSubmitDisable]=useState(false)
    const navigat = useNavigate()

    function signupFormHandel(e) {
        setSubmitDisable(true)
        e.preventDefault()
        axios.post("http://localhost:8000/api/signup", {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            role: e.target.role.value
        })
            .then((res) => {
                setSubmitDisable(false)
                toast.success("Signup sucess")
                navigat("/login")
            })
            .catch((err) => {
                const errorMsg = {
                    name: "",
                    email: "",
                    password: "",
                    role: "",
                }
                toast.error("Signup Failed")
                setSubmitDisable(false)
                err.response.data.errors.map((el) => {
                    if (el.field == "name") {
                        errorMsg.name = el.message
                    }
                    else if (el.field == "email") {
                        errorMsg.email = el.message
                    }
                    else if (el.field == "password") {
                        errorMsg.password = el.message
                    }
                    else if (el.field == "role") {
                        errorMsg.role = el.message
                    }

                });
                setFieldError(errorMsg)

            })

    }
    return (
        <>
            <div className='bg-[#FEC23E] lg:h-[100vh]  flex justify-center items-center py-6'>
                <div className='border border-black gap-3 lg:flex'>

                    <div className='p-5 flex flex-col justify-center items-center gap-8'>
                        <p className='text-[2rem]'>Signup</p>
                        <form onSubmit={signupFormHandel} className='flex flex-col gap-3'>
                            <input type="text" name="name" placeholder='Username'
                                className='px-2 py-1 rounded-xl' />
                            <span className='text-[red] text-[0.8rem] '>{fieldError.name}</span>
                            <input type="email" name="email" placeholder='email'
                                className='px-2 py-1 rounded-xl' />
                            <span className='text-[red] text-[0.8rem] '>{fieldError.email}</span>
                            <input type="peaasword" name='password' placeholder='Password'
                                className='px-2 py-1 rounded-xl' />
                            <span className='text-[red] text-[0.8rem] '>{fieldError.password}</span>
                            <select name="role" className='px-2 py-1 rounded-xl' >
                                <option value="-">--</option>
                                <option value="buyer">Buyer</option>
                                <option value="seller">Seller</option>
                            </select>
                            <span className='text-[red] text-[0.8rem] '>{fieldError.role}</span>
                            <button disabled={submitDisable} className='disabled:cursor-no-drop  border border-black py-1 rounded-xl hover:bg-blue-700 hover:text-white'>Signup</button>
                            <p>Already have an account? <Link to={'/login'} className='font-[600] text-blue-700 cursor-pointer'>Login</Link></p>

                        </form>
                    </div>
                    <div className='max-w-[300px]'>
                        <img src="/signin.jpg" alt="puppy" className='h-[100%] w-[100%]' />
                    </div>
                </div>  
            </div>
        </>
    )
}

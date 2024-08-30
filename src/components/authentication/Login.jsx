import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {setuser} from '../../redux/slice/userSlice'

export default function Login() {
    const [fieldError, setFieldError] = useState({})
    const [submitDisable, setSubmitDisable]=useState(false)
    const navigat = useNavigate()
    let dispatch =useDispatch()
   


    function loginFormHandel(e) {
        e.preventDefault()
        setSubmitDisable(true)
        axios.post("http://localhost:8000/api/login", {
            email: e.target.email.value,
            password: e.target.password.value,
        })
            .then((res) => {
                localStorage.setItem('token', res.data.token)
                dispatch(setuser(res.data))
                toast.success("Login sucess")
                setSubmitDisable(false)
                navigat("/")
            })
            .catch((err) => {
                const loginErrorMsg = {
                    email: "",
                    password: "",
                }
                setSubmitDisable(false)
                toast.error(err.response.data.msg)
               
                err.response.data.errors.map((el) => {

                    if (el.field == "email") {
                        loginErrorMsg.email = el.message
                    }
                    else if (el.field == "password") {
                        loginErrorMsg.password = el.message
                    }

                });
                setFieldError(loginErrorMsg)
                setSubmitDisable(false)

            })
    }

    return (
    <>
        <div className='bg-[#FEC23E] lg:h-[100vh]  flex justify-center items-center py-6'>

            <div className='border border-black gap-3 lg:flex'>
                <div className='max-w-[300px]'>
                    <img src="/login.jpg" alt="puppy" />
                </div>
                <div className='p-5 flex flex-col justify-center items-center gap-8'>
                    <p className='text-[2rem]'>Login</p>
                    <form onSubmit={loginFormHandel} className='flex flex-col gap-3'>
                        <input type="email" name="email" placeholder='email'
                            className='px-2 py-1 rounded-xl' />
                        <span className='text-[red] text-[0.8rem] '>{fieldError.email}</span>
                        <input type="peaasword" name='password' placeholder='Password'
                            className='px-2 py-1 rounded-xl' />
                        <span className='text-[red] text-[0.8rem] '>{fieldError.password}</span>
                        <Link to={"/password-reset"}>Forget password?</Link>
                        <button disabled={submitDisable} className='disabled:cursor-no-drop  border border-black py-1 rounded-xl hover:bg-blue-700 hover:text-white'>Login</button>
                        <p>Don't have an account? <Link to={"/signin"} className=' font-[600] text-blue-700 cursor-pointer'>Signin</Link></p>

                    </form>
                </div>
            </div>
            </div>
        </>
        )
}

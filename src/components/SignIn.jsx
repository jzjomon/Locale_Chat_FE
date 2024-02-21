import React, { useState } from 'react'
import { EnvelopeOpenIcon, EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/solid'
import { Alert, Toast } from '../constants/sweetAlert';
import { baseURL } from '../constants/baseURL';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserDetails } from "../toolkit/userSlice"


const SignIn = ({ setSignUp }) => {
    const [pShow, setPShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = () => {
        try {
            if (email && password) {
                axios.post(`${baseURL}/signIn`, { email, password }).then(({ data }) => {
                    if (data) {
                        localStorage.setItem("userDetails", JSON.stringify(data?.data));
                        localStorage.setItem("token", data?.token)
                        dispatch(setUserDetails(data?.data));
                        navigate("/home");
                    } else {
                        Toast({
                            title : "cannot sign in",
                            icon : "error"
                        })
                    }
                }).catch(({ response: { data } }) => {
                    Toast({
                        title: `${data?.message}`,
                        icon: "error"
                    })
                });

            } else {
                Toast({
                    title: "Inputs cannot be empty",
                    icon: "warning"
                })
            }
        } catch (error) {
            Alert({
                title: "Something went wrong !",
                icon: "error"
            })
        }
    }

    return (
        <div className=' w-11/12 md:4/5 lg:w-3/4 shadow-xl shadow-gray-400 xl:w-3/5 rounded-3xl overflow-hidden  h-3/4 flex'>
            <div className=' bg-gradient-to-b from-purple-500 to-purple-900 md:bg-none  w-full md:w-3/4 h-full flex justify-center items-center'>
                <div className='md:text-gray-800 text-white flex items-center justify-center flex-col w-10/12  h-3/4'>
                    <h1 className='text-3xl font-bold pb-1'>Hello!</h1>
                    <p className='text-sm font-semibold'>Sing in to your account</p>
                    <div className='my-6 text-black w-full items-center  gap-7 flex flex-col'>
                        <div className='w-2/3 relative'>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className='shadow-gray-400 shadow-lg  p-3 ps-12 rounded-3xl w-full focus:outline-none' placeholder='E-mail' />
                            <EnvelopeOpenIcon className='absolute w-7 h-7 top-2 left-3 text-purple-700' />
                        </div>
                        <div className='w-2/3 relative'>
                            <input type={pShow ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className='shadow-gray-400 shadow-lg  p-3 ps-12 rounded-3xl w-full focus:outline-none' placeholder='Password' />
                            <LockClosedIcon className='absolute w-7 h-7 top-2 left-3 text-purple-700' />
                            {
                                pShow ? (
                                    <EyeSlashIcon className='absolute w-6 h-6 top-3 right-3 text-purple-700' onClick={() => setPShow(!pShow)} />
                                ) : (
                                    <EyeIcon className='absolute w-6 h-6 top-3 right-3 text-purple-700' onClick={() => setPShow(!pShow)} />
                                )
                            }
                        </div>
                    </div>
                    <div className='mb-3'>
                        <button onClick={handleSubmit} className='bg-white md:bg-purple-700 md:text-white text-purple-800 px-7 py-3 font-bold text-sm  rounded-3xl shadow-lg shadow-gray-500'>SING IN</button>
                    </div>
                    <div>
                        <p className='text-gray-400'>Don't have an account? <span onClick={() => setSignUp("up")} className=' font-semibold md:text-purple-700 hover:cursor-pointer text-white'>Create</span></p>
                    </div>
                </div>
            </div>
            <div className='bg-gradient-to-b from-purple-500 to-purple-900 hidden md:flex  w-3/5 h-full  justify-center items-center'>
                <div className='w-full flex flex-col gap-3 items-center'>
                    <h1 className='text-3xl  font-semibold'>Welcome Back!</h1>
                    <h6 className=' w-3/4 font-thin '>Find your tribe, share your voice. The conversation starts now.</h6>
                </div>
            </div>
        </div>
    )
}

export default SignIn
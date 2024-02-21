import { ArrowLeftCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModal } from '../toolkit/modal.js';
import { AxiosInstance } from '../config/axiosConfig';
import { Alert } from '../constants/sweetAlert.js';
import { setCurrentUser } from '../toolkit/currentUser.js';

const Modal = () => {
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const { userDetails } = useSelector(state => state.userDetails);

    useEffect(() => {
        getUsers();
    }, [input])
    const getUsers = () => {
        try {
            AxiosInstance.post("/users/getUser", { input }).then((result) => {
                setUsers(result.data.data);
            }).catch((err) => {
                Alert({
                    title: "Cant get the user !",
                    icon: "error"
                })
            });
        } catch (error) {
            Alert({
                title: "Something went wrong",
                icon: "error"
            })
        }
    }

    const handleOpenChat = (user) => {
        dispatch(setCurrentUser(user))
        dispatch(setModal(false))
    }

    return (
        <>
            <div className=' mx-3 xl:w-1/3 lg:w-2/4 md:w-3/4 w-full   h-3/4 '>
                <ArrowLeftCircleIcon onClick={() => dispatch(setModal(false))} className='w-10 absolute z-50 top-3 left-3 h-10 ' />
                <div className='relative mb-1 w-full h-[10%]  '>
                    <input type="text" placeholder='Search by name or location' value={input} className='w-full ps-9 rounded-3xl py-3 focus:border-none focus:outline-none bg-[#6e36a5] text-lg ' onChange={(e) => { setInput(e.target.value) }} />
                    <MagnifyingGlassIcon className='absolute top-3 left-2 w-7 h-7  ' color='gray' />
                </div>
                {/* <div className='flex justify-center gap-5 mb-3' >
                    <div className=' flex justify-center items-center gap-3'>
                        <span>Search by name</span>
                        <input type='checkbox' readOnly checked={search && true} onClick={() => setSearch(true)} />
                    </div>
                    <div className=' flex justify-center items-center gap-3'>
                        <span>Search by location</span>
                        <input type='checkbox' readOnly checked={!search && true} onClick={() => setSearch(false)} />
                    </div>
                </div> */}
                <div className='bg-[#6e36a5] p-5 ms-1 h-[90%] overflow-auto  rounded-xl'>
                    {users.map((user, i) => (
                        <div onClick={() => handleOpenChat(user)} key={i} className=' flex justify-center   hover:bg-[#936bbb] transition-all rounded-xl md:ps-6 md:pe-9 md:mx-2  pe-7 ps-3 mb-3'>
                            <div className='flex items-center w-[50%]'>
                            <img src='/profile-icon.jpg' alt='user' className='border w-10 h-10 me-3 rounded-full' />
                            <div className='flex justify-center items-center '>
                                <div className='py-3'>
                                    <h1 className='text-xl font-semibold py-1'>{user?._id === userDetails._id ? "you" : user?.firstname} {user?._id !== userDetails._id && user?.lastname}</h1>
                                    <h6 className='text-sm text-gray-400 font-semibold'></h6>
                                </div>
                                <div className='ms-10  text-end'>
                                    {/* <h1 className='text-sm font-bold'>{user?._id === userDetails._id && user?.lastOnline}</h1> */}
                                    {/* <button className='rounded-full bg-orange-400 px-2'>4</button> */}
                                </div>
                            </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}

export default Modal
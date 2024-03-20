import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { Alert } from '../constants/sweetAlert';
import { AxiosInstance } from '../config/axiosConfig';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../toolkit/currentUser';

const AllChats = ({ Chats }) => {
    const [users, setUsers] = useState([]);
    const { mobile } = useSelector(state => state.screen);
    const { currentUser } = useSelector(state => state.currentUser)
    const dispatch = useDispatch();
    const { userDetails } = useSelector(state => state.userDetails);
    const [input, setInput] = useState('');


    useEffect(() => {
        getUsers();
    }, [Chats])

    useEffect(() => {
        let filteredUsers = users?.filter(user => user?.users[0]?._id === userDetails?._id ? input === user?.users[1].firstname && user : input === user?.users[0].firstname && user);
        if (filteredUsers.length > 0) {
            setUsers(filteredUsers)
        } else {
            getUsers();
        }
    }, [input])

    const getUsers = () => {
        try {
            AxiosInstance.post("/users/getChats").then((result) => {
                setUsers(result?.data?.data);
            }).catch((err) => {
                Toast({
                    title: "cannot get users",
                    icon: "error",
                })
            });
        } catch (error) {
            Alert({
                title: "Something went wrong !",
                icon: "error"
            })
        }
    }


    const handleOpenChat = (user) => {
        dispatch(setCurrentUser(user))
    }

    return (
        <>
            <div className='md:mx-2 h-[95%] mx-3' >
                <div className='relative mb-3 h-[10%] '>
                    <input type="text" placeholder='search' value={input} className='w-full ps-9 rounded-3xl py-3 focus:border-none focus:outline-none bg-[#6e36a5] text-lg ' onChange={(e) => { setInput(e.target.value) }} />
                    <MagnifyingGlassIcon className='absolute top-3 left-2 w-7 h-7  ' color='gray' />
                </div>
                <div className='bg-[#6e36a5] py-3 h-[90%] overflow-auto  rounded-xl'>
                    {users.map((user, i) => (
                        <div onClick={() => { user?.users[0]?._id === userDetails._id ? handleOpenChat(user?.users[1]) : handleOpenChat(user?.users[0]) }} key={i} className={` flex justify-center items-center ${user?.users[0]._id === userDetails?._id ? user?.users[1]?._id === currentUser?._id && "bg-[#936bbb]" : user?.users[0]?._id === currentUser?._id && "bg-[#936bbb]"} transition-all  rounded-xl md:ps-6 md:pe-9 md:mx-2  pe-7 ps-3 mb-3`}>
                            <img src='/profile-icon.jpg' alt='user' className='border  w-10 mx-3 my-1 h-10  rounded-full' />
                            <div className='flex justify-center items-center '>
                                <div className='py-3'>
                                    <h1 className='text-xl font-semibold min-w-40 py-1'>{user?.users[0]?._id === userDetails._id ? user?.users[1]?.firstname : user?.users[0].firstname} {user?.users[0]?._id === userDetails._id ? user?.users[1]?.lastname : user?.users[0]?.lastname}</h1>
                                    <h6 className='text-sm text-gray-400 font-semibold'>{user?.lastmessage}</h6>
                                </div>
                                <div className='pe-3  text-end'>
                                    <h1 className='text-xs font-semibold w-10'>{ user?.users[0]?._id === userDetails._id ? user?.users[1]?.lastOnline  : user?.users[0]?.lastOnline}</h1>
                                    {/* <button className='rounded-full bg-orange-400 px-2'>{user?.unread}</button> */}
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}

export default AllChats
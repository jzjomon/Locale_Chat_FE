import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import AllChats from '../components/AllChats';
import SingleChat from '../components/SingleChat';
import { useDispatch, useSelector } from 'react-redux'
import { useScreenSize } from '../constants/useScreenSize'
import { setMobile } from '../toolkit/screenSlice'
import Modal from '../components/Modal'
import { setModal } from '../toolkit/modal';
import { AxiosInstance } from '../config/axiosConfig';
import io from 'socket.io-client'
import { baseURL } from '../constants/baseURL';


const Home = () => {
    const { mobile } = useSelector(state => state.screen);
    const { width, height } = useScreenSize();
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.currentUser)
    const { userDetails } = useSelector(state => state.userDetails);
    const socket = io(baseURL)
    const [messages, setMessages] = useState()


    useEffect(() => {
        if (width < 768) {
            dispatch(setMobile(true))
        } else {
            dispatch(setMobile(false))
        }
    }, [width])
    const { modal } = useSelector(state => state.modal);
    const [Chats, setChats] = useState(true)

    useEffect(() => {
        setChats(!Chats)
    }, [modal, currentUser])

    useEffect(() => {
        socket.emit("addUserId", userDetails?._id);
        const cleanUp = () => {
            socket.disconnect();
        }
        window.addEventListener("beforeunload", cleanUp);
        return () => {
            window.removeEventListener("beforeunload", cleanUp)
        }
    }, [])

    useEffect(() => {
        socket.on("getOnline", (id) => {
            setChats(!Chats)
        })

        socket.on("getLastOnline", (id) => {
            setChats(!Chats)
        })

        socket.on("message", (data) => {
            setMessages(data);
        })

    })

    return (
        <>
            {
                modal &&
                <div className=' absolute top-0 bottom-0 right-0 bg-[#4a1b7a] z-50 bg- left-0 flex justify-center items-center w-screen h-screen'>
                    <Modal />
                </div>
            }
            <div className='h-screen  flex md:px-5 flex-col'>
                <Navbar />
                <div className='flex justify-around h-[90%] overflow-auto w-full'>
                    {
                        mobile ? (
                            currentUser ? <SingleChat Chats={Chats} setChats={setChats} socket={socket} message={messages} /> : <AllChats Chats={Chats} />
                        ) : (
                            <>
                                <AllChats Chats={Chats} />
                                <SingleChat Chats={Chats} setChats={setChats} socket={socket} message={messages} />
                            </>
                        )
                    }

                </div>
            </div>
        </>
    )
}

export default Home
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import InputEmoji from 'react-input-emoji'
import React, { useEffect, useRef, useState } from 'react'
import { setCurrentUser } from '../toolkit/currentUser';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import { Alert, Toast } from '../constants/sweetAlert'
import { AxiosInstance } from '../config/axiosConfig'
import { useNavigate } from 'react-router-dom';


const SingleChat = ({ Chats, setChats, socket, message }) => {
  const dispatch = useDispatch();
  // let {socket} = useSelector(state => state.socket);
  const { mobile } = useSelector(state => state.screen)
  const scrollRef = useRef(null);
  const { currentUser } = useSelector(state => state.currentUser);
  const { userDetails } = useSelector(state => state.userDetails);
  const [messages, setMessages] = useState([])
  const [chatId, setChatId] = useState('');
  const [text, setText] = useState('');



  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages])

  useEffect(() => {
    if (currentUser) {
      getMessages();
    }
  }, [currentUser])

  useEffect(() => {
    setMessages([...messages, message]);
  }, [message])



  useEffect(() => {
    () => {
      dispatch(setCurrentUser(null));
    }
  }, [])

  const getMessages = () => {
    try {
      AxiosInstance.post('/users/getMessages', { currentUser }).then((result) => {
        setMessages(result?.data?.messages);
        setChatId(result?.data?.chatId)
      }).catch((err) => {
        Toast({
          title: "cannot find the messages",
          icon: "error"
        })
      });
    } catch (error) {
      Alert({
        title: "Something went wrong ",
        icon: "error"
      })
    }
  }



  const handleEnter = () => {
    try {
      if (text.length < 1) return Toast({ title: "type something", icon: "warning" });
      AxiosInstance.post('/users/sendMessage', { chatId, sender: userDetails._id, text }).then((result) => {
        socket.emit("sendMessage", { text, userId: currentUser?._id, sender: userDetails._id });
      })
    } catch (error) {
      Alert({
        title: "Something went wrong ",
        icon: "error"
      })
    }
  }

  const clearChat = () => {
    try {
      AxiosInstance.post("/users/clearChat", { chatId, currentUserId : currentUser._id }).then((result) => {
        setChats(!Chats)
        getMessages();
      }).catch((err) => {
        Toast({
          title : "cannot clear chat",
          icon : "error",
        })
      });
    } catch (error) {
      Alert({
        title: "Something went wrong ",
        icon: "error"
      })
    }
  }

  return (
    <>
      {
        currentUser ? (
          <div className='flex flex-col h-[97%] md:w-[70%]'>
            <div className='flex  justify-between'>
              <div className='flex justify-center mb-7 pt-2'>
                {mobile && <ArrowLeftCircleIcon className='w-10 h-10' onClick={() => { dispatch(setCurrentUser(null)) }} />}
              </div>
              <div className='flex gap-5 justify-end mb-7 pt-2 me-6 pe-3' >
                <button className='px-5 py-2 border rounded-3xl border-[#6e36a5] font-semibold hover:bg-[#6e36a5]' onClick={clearChat}>CLEAR CHAT</button>
                <button className='px-5 py-2 border rounded-3xl border-[#6e36a5] font-semibold'>MORE</button>
              </div>
            </div>
            <div className='rounded-2xl pb-5   flex-col  bg-[#6e36a5] flex justify-center w-full h-[88%] '>
              <div ref={scrollRef} className='flex justify-center w-full h-[90%] overflow-auto'>
                <div className=' w-3/4 lg:w-1/2 h-full py-3 '>
                  {/* <div className=' w-full items-center flex justify-start pb-3'>
                    <div>
                      <img src="/profile-icon.jpg" alt="user image" className='w-10 me-3  border rounded-full' />
                    </div>
                    <div className='w-3/4 flex justify-start '>
                      <span className=' bg-[#4a1b7a] p-6 max-w-3/4 rounded-3xl'>Hello how are you doin asdf  asdfdasf g </span>
                    </div>
                  </div>

                  <div className='w-full flex justify-end pb-3'>
                    <div className='w-3/4 flex justify-end '>
                      <span className=' bg-orange-400 p-6 max-w-3/4 rounded-3xl '>Hei im asdfasfasf as dsdaf doing goodasdfad sfadsfasd saf </span>
                    </div>
                  </div> */}
                  {messages?.map((message, index) => (
                    <div key={index} >
                      {message?.sender === userDetails?._id ? (
                        <div className='w-full flex justify-end pb-3 '>
                          <div className='w-3/4 flex justify-end '>
                            <span className=' bg-orange-400 p-6 max-w-3/4 rounded-3xl '>{message?.text} </span>
                          </div>
                        </div>
                      ) : (
                        <div className=' w-full items-center flex justify-start pb-3'>
                          <div>
                            <img src="/profile-icon.jpg" alt="user image" className='w-10 me-3  border rounded-full' />
                          </div>
                          <div className='w-3/4 flex justify-start '>
                            <span className=' bg-[#4a1b7a] p-6 max-w-3/4 rounded-3xl'>{message?.text}</span>
                          </div>
                        </div>

                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className='flex justify-center'>
                <div className='md:w-[60%] w-[90%] flex '>
                  <InputEmoji value={text} onChange={(e) => setText(e)} cleanOnEnter onEnter={handleEnter} />
                  <div className='flex justify-center items-center'>
                    {/* {text && <button className=' rounded-full flex justify-center bg-blue-500 items-center p-2 px-3'>
                      <PaperAirplaneIcon className='w-6 h-7' onClick={handleEnter} />
                    </button>} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex flex-col h-[97%] md:w-[70%]'>
            <div className='flex  justify-between'>
              <div className='flex justify-center mb-7 pt-2'>
                {/* {mobile && <ArrowLeftCircleIcon className='w-10 h-10' onClick={() => { dispatch(setCurrentUser(null)) }} />} */}
              </div>
              <div className='flex gap-5 justify-end mb-7 pt-2 me-6 pe-3' >
                <button className='px-5 py-2 border rounded-3xl border-[#6e36a5] font-semibold'>CLEAR CHAT</button>
                <button className='px-5 py-2 border rounded-3xl border-[#6e36a5] font-semibold'>MORE</button>
              </div>
            </div>
            <div className='rounded-2xl pb-5  flex-col  bg-[#6e36a5] flex justify-center w-full h-[88%] '>
              {/* <div ref={scrollRef} className='flex justify-center w-full h-[90%] overflow-auto'>
                <div className=' w-3/4 lg:w-1/2 h-full py-3 '>
                  <div className=' w-full items-center flex justify-start pb-3'>
                    <div>
                      <img src="/profile-icon.jpg" alt="user image" className='w-10 me-3  border rounded-full' />
                    </div>
                    <div className='w-3/4 flex justify-start '>
                      <span className=' bg-[#4a1b7a] p-6 max-w-3/4 rounded-3xl'>Hello how are you doin asdf  asdfdasf g </span>
                    </div>
                  </div>
                  <div className='w-full flex justify-end pb-3'>
                    <div className='w-3/4 flex justify-end '>
                      <span className=' bg-orange-400 p-6 max-w-3/4 rounded-3xl '>Hei im asdfasfasf as dsdaf doing goodasdfad sfadsfasd saf </span>
                    </div>
                  </div>
                  
                </div>
              </div> */}
              <div className='flex justify-center'>
                {/* <div className='md:w-[60%] w-[90%] flex '>
                  <InputEmoji value={text} onChange={(e) => setText(e)} cleanOnEnter onEnter={handleEnter} />
                  <div className='flex justify-center items-center'>
                    {text && <button className=' rounded-full flex justify-center bg-blue-500 items-center p-2 px-3'>
                      <PaperAirplaneIcon className='w-6 h-7' onClick={handleEnter} />
                    </button>}
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default SingleChat
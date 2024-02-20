import { EnvelopeOpenIcon, EyeIcon, EyeSlashIcon, LockClosedIcon, MapPinIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react'
import { validateEmail, validateFirstName, validateLastName, validatePass } from '../constants/regex'
import { Alert, Toast } from '../constants/sweetAlert'
import axios from 'axios';
import { baseURL } from '../constants/baseURL';


const SignUp = ({ setSingIn }) => {
  const [details, setDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    location: "",
    password: "",
  });
  const [rePass, setRePass] = useState("");
  const [pShow, setPShow] = useState(false);
  const handleSubmit = () => {
    try {
      axios.post(`${baseURL}/signUp`, { details }).then((result) => {
        Toast({
          title: "Sign Up Success",
          text: "please sign in",
          icon: "success"
        }).then(() => {
          setSingIn("in");
        })
      }).catch(({ response: { data } }) => {
        Toast({
          title: `${data?.message}`,
          icon: "warning"
        }).then(() => {
          setSingIn("in");
        })
      });
    } catch (error) {
      Alert({
        title: "Somethin went wrong !",
        icon: "error"
      })
    }
  }


  const handleDetails = () => {
    try {
      if (!details.firstname && !details.lastname && !details.email && !details.password && !details.confirmPass) {
        Toast({
          title: "Inputs cannot be empty !",
          icon: "error"
        })
      } else {
        if (!validateFirstName.test(details.firstname)) {
          Toast({
            title: "Invalid firstname !",
            icon: "warning"
          })
        } else if (!validateLastName.test(details.lastname)) {
          Toast({
            title: "Invalid lastname !",
            icon: "warning"
          })
        } else if (!validateEmail.test(details.email)) {
          Toast({
            title: "Invalid email id !",
            icon: "warning"
          })
        } else if (!validatePass.test(details.password)) {
          Toast({
            title: "Your password must be a minimum of 6 characters, starting with an alphabetical letter or number, and include at least one special character",
            icon: "warning",
            timer: 3000
          })
        } else if (!rePass) {
          Toast({
            title: "Invalid confirm password !",
            icon: "warning"
          })
        } else {
          if (details.password !== rePass) {
            Toast({
              title: "passwords are not same !",
              icon: "error"
            })
          } else {
            handleSubmit();
          }
        }
      }

    } catch (error) {
      Toast({
        title: "Something went wrong !",
        icon: "error"
      })
    }
  }

  return (
    <div className=' w-11/12 md:4/5 lg:w-3/4 shadow-xl shadow-gray-400 xl:w-3/5 rounded-3xl overflow-hidden  h-3/4 flex'>
      <div className=' bg-gradient-to-b from-purple-500 to-purple-900 md:bg-none  w-full md:w-3/4 h-full flex justify-center items-center'>
        <div className='md:text-gray-800 text-white  flex items-center justify-center flex-col w-10/12  h-3/4'>
          <h1 className='text-3xl font-bold pb-1'>Hello, friend!</h1>
          <div className='my-6 w-full text-black items-center overflow-auto pb-5  gap-7 flex flex-col'>
            <div className='w-2/3 relative'>
              <input type="text" value={details.firstname} onChange={(e) => setDetails({ ...details, firstname: e.target.value.trim() })} className='shadow-gray-400 shadow-lg  p-3 ps-12 rounded-3xl w-full focus:outline-none' placeholder='First-name' />
              <UserCircleIcon className='absolute w-7 h-7 top-2 left-3 text-purple-700' />
            </div>
            <div className='w-2/3 relative'>
              <input type="text" value={details.lastname} onChange={(e) => setDetails({ ...details, lastname: e.target.value.trim() })} className='shadow-gray-400 shadow-lg  p-3 ps-12 rounded-3xl w-full focus:outline-none' placeholder='Last-name' />
              <UserCircleIcon className='absolute w-7 h-7 top-2 left-3 text-purple-700' />
            </div>
            <div className='w-2/3 relative'>
              <input type="text" value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value.trim() })} className='shadow-gray-400 shadow-lg  p-3 ps-12 rounded-3xl w-full focus:outline-none' placeholder='E-mail' />
              <EnvelopeOpenIcon className='absolute w-7 h-7 top-2 left-3 text-purple-700' />
            </div>
            <div className='w-2/3 relative'>
              <input type="text" value={details.location} onChange={(e) => setDetails({ ...details, location: e.target.value.trim() })} className='shadow-gray-400 shadow-lg  p-3 ps-12 rounded-3xl w-full focus:outline-none' placeholder='Location' />
              <MapPinIcon className='absolute w-7 h-7 top-2 left-3 text-purple-700' />
            </div>
            <div className='w-2/3 relative'>
              <input type={pShow ? "text" : "password"} value={details.password} onChange={(e) => setDetails({ ...details, password: e.target.value.trim() })} className='shadow-gray-400 shadow-lg  p-3 ps-12 rounded-3xl w-full focus:outline-none' placeholder='Password' />
              <LockClosedIcon className='absolute w-7 h-7 top-2 left-3 text-purple-700' />
              {
                pShow ? (
                  <EyeSlashIcon className='absolute w-6 h-6 top-3 right-3 text-purple-700' onClick={() => setPShow(!pShow)} />
                ) : (
                  <EyeIcon className='absolute w-6 h-6 top-3 right-3 text-purple-700' onClick={() => setPShow(!pShow)} />
                )
              }
            </div>
            <div className='w-2/3 relative'>
              <input type={pShow ? "text" : "password"} value={rePass} onChange={(e) => setRePass(e.target.value.trim())} className='shadow-gray-400 shadow-lg  p-3 ps-12 rounded-3xl w-full focus:outline-none' placeholder='Re enter password' />
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
            <button onClick={handleDetails} className='bg-white md:bg-purple-700 md:text-white text-purple-800 px-7 py-3 font-bold text-sm  rounded-3xl shadow-lg shadow-gray-500'>SING UP</button>
          </div>
          <div>
            <p className='text-gray-400'>Already have an account? <span className='md:text-purple-700 hover:cursor-pointer text-white font-semibold' onClick={() => setSingIn("in")}>Sign In</span></p>
          </div>
        </div>
      </div>
      <div className='bg-gradient-to-b from-purple-500 to-purple-900 hidden md:flex  w-3/5 h-full  justify-center items-center'>
        <div className='w-full flex flex-col gap-3 items-center'>
          <h1 className='text-3xl  font-semibold'>Glad to see you!</h1>
          <h6 className=' w-3/4 font-thin '>Find your tribe, instantly. Join the real-time chat app built for you</h6>
        </div>
      </div>
    </div>
  )
}

export default SignUp
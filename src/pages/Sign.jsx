import React, { useState } from 'react'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'

const Sign = () => {
  const [inOrUp, setInOrUp] = useState("in");
  return (
    <div className='w-full h-screen bg-white flex justify-center items-center'>
      {
        inOrUp === "up" ? <SignUp setSingIn={setInOrUp} /> : <SignIn setSignUp={setInOrUp} />
      }
    </div>
  )
}

export default Sign
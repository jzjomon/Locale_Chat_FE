import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Sign from './pages/Sign'
import { Authorization, SignOutOrHome } from './constants/Authorization'

const App = () => {
  return (
     <Router>
     <Routes>
       <Route element={<SignOutOrHome />}>
         <Route path='/' element={<Sign />} />
       </Route>
       <Route element={<Authorization />} >
         <Route path='/home' element={<Home />} />
       </Route>
     </Routes>
   </Router>
  )
}

export default App
import React from 'react'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from "../src/pages/Home"
import About from './pages/About'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Dashbord from './pages/Dashbord'
import Projects from './pages/Projects'
import Header from "./componets/Header"
function App() {
  return (
    <BrowserRouter>
    <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>} ></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/sign-in' element={<Signin></Signin>}></Route>
        <Route path='/sign-up' element={<Signup></Signup>}></Route>
        <Route path='/dashboard' element={<Dashbord></Dashbord>}></Route>
        <Route path='/projects' element={<Projects></Projects>}></Route>



      </Routes>
    
    
    </BrowserRouter>
  )
}

export default App
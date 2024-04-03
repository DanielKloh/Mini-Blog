import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import About from './pages/about/About'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Login from './pages/login/Login'
import Register from './pages/Register/Register'

function App() {

  return (
    <div>
      <BrowserRouter>

      <Navbar/>

      <div className='container'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
      </div>
      </BrowserRouter>

      <Footer/>
    </div>
  )
}

export default App

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import About from './pages/about/About'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Login from './pages/login/Login'
import Register from './pages/Register/Register'
import { AuthProvider } from './context/AuthContet'
import { useEffect, useState } from 'react'
import { useAuthentication } from './hooks/useAuthentication'
import { onAuthStateChanged } from 'firebase/auth'

function App() {

  const [user, setUser] = useState(undefined);
  const {auth} = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(()=>{
    onAuthStateChanged(auth, () => {
      setUser(user)
    });
  },[auth])


  if(loadingUser){
    <p>carregando...</p>
  }

  return (
    <div>
      <AuthProvider value={user}>
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
          
          <Footer/>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import { AuthProvider } from './context/AuthContet'
import { useEffect, useState } from 'react'
import { useAuthentication } from './hooks/useAuthentication'
import { onAuthStateChanged } from 'firebase/auth'
import CreatePost from './pages/CreatePost/CreatePost'
import Dashboard from './pages/Dashboard/Dashboard'
import Search  from './pages/Search/Search'
import EditPost from './pages/EditPost/EditPost'
import Post from './pages/Post/Post'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importa o CSS do react-toastify


function App() {

  const [user, setUser] = useState(undefined);
  const {auth} = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user:any) => {
      setUser(user);
    });
  }, [auth]);


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
              <Route path='/search' element={<Search/>}/>
              <Route path='/post/:id' element={<Post/>}/>
              <Route path='/login' element={!user ?<Login/>: <Navigate to="/"/> }/>
              <Route path='/register' element={!user ? <Register/>: <Navigate to="/"/> }/>
              <Route path='/about' element={<About/>}/>
              <Route path='/post/create' element={user ? <CreatePost/>: <Navigate to="/login"/> }/>
              <Route path='/post/edit/:id' element={user ? <EditPost/>: <Navigate to="/login"/> }/>
              <Route path='/dashboard' element={user ? <Dashboard/>: <Navigate to="/login"/> }/>

            </Routes>
          </div>
          <ToastContainer /> {/* Componente responsável por exibir os toasts */}
          <Footer/>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App

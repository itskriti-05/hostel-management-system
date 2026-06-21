import { BrowserRouter , Routes , Route } from 'react-router-dom'
import React from 'react'
import Landing from './pages/Landing/Landing'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import { AuthProvider } from './context/AuthContext'


const App = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
    <Routes>
      <Route  path='/' element={<Landing/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>

    </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
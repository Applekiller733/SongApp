import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/home/home'
import Login from './pages/login/login'
import Signup from './pages/signup/signup'
import './App.css'
import { Provider } from 'react-redux'
import userstore from './stores/store'

function App() {

  return (
    <Provider store={userstore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App

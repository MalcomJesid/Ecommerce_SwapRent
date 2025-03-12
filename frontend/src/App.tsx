import './App.css'
import Category from './components/product/Category'
import Error404 from './components/error/Error404'
import Layout from './components/principal/Layout'
import { Routes,Route } from "react-router"
import Offer from './components/product/Offer'
import Rent from './components/product/Rent'
import Exchange from './components/product/Exchange'
import History from './components/chat/History'
import Content from './components/principal/Content'
import Login from './components/auth/Login'
import Register from "./components/auth/Register";
const  App =() => {
 
  return (
    <>
    <Routes >
      <Route  path ="/" element={<Layout />} />
      <Route  path ="*" element={<Error404 />} />
      <Route  path ="content" element={<Content />} />
      <Route  path ="category" element={<Category />} />
      <Route  path ="offer" element={<Offer />} />
      <Route  path ="history" element={<History />} />
      <Route  path ="rent" element={<Rent />} />
      <Route  path ="exchange" element={<Exchange />} />
      <Route  path ="login" element={<Login />} />
      <Route path="/register" element={<Register />} />
  </Routes>
    </>
  )
}

export default App

import './App.css'
import Category from './components/Category'
import Error404 from './components/Error404'
import Layout from './components/Layout'
import { Routes,Route } from "react-router"
import Offer from './components/Offer'
import Rent from './components/Rent'
import Exchange from './components/Exchange'
import History from './components/History'
import Content from './components/Content'

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

    </Routes>
    </>
  )
}

export default App

import Content from './Content';
import Footer from './Footer';
import Navbar from './Navbar';
import { Outlet } from "react-router"


const  Layout =() => {
 
  return (
    <>
    <div>
        <Navbar />
        <Content />
            <main>
                <Outlet />
            </main>
        <Footer />      
    </div>
    </>
  )
}

export default Layout;

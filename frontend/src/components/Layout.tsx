import Content from './Content';
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
    </div>
    </>
  )
}

export default Layout;

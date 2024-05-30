import Navbar from "../commonComponents/Navbar";
import Footer from "../commonComponents/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
    <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout

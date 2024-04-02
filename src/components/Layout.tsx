import Navbar from "../commonComponents/Navbar";
import Footer from "../commonComponents/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
    <Navbar/>
      <h2>This is layout component</h2>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout

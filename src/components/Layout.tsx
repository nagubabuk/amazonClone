import Footer from "../commonComponents/Footer";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../commonComponents/Navbar";

function Layout() {
  return (
    <div>
      <NavbarComponent />
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout

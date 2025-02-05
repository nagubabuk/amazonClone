import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom"
import './App.css';
import Layout from "./components/Layout";
import Home from "./components/Home";
import Register from "./features/auth/Register";
import ProductCreate from "./components/Admin/ProductCreate";
import NavbarComponent from "./commonComponents/Navbar";
import Footer from "./commonComponents/Footer";

function App() {
  return (
    <>
      <NavbarComponent/>
      <Outlet/>
      <Footer/>
    </>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css';
import Layout from "./components/Layout";
import Home from "./components/Home";
import Register from "./features/auth/Register";
import ProductCreate from "./components/Admin/ProductCreate";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="create-product" element={<ProductCreate />}/>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

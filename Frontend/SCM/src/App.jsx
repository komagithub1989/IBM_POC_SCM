import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home'
import Reports from "./pages/reports";
import Transfer from "./pages/transfers";
import WareHouse from "./pages/warehouse";
import NavbarMenu from "./components/NavbarMenu";
import './App.css'

function App() {

  return (
    <>
     <Router>
      <NavbarMenu />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transfers" element={<Transfer />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/warehouse" element={<WareHouse></WareHouse>} ></Route>
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App

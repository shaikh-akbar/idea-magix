
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginCard from './components/login/LoginCard';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from './components/dashboard/Dashboard';
import Instructor from './components/dashboard/instructor/instructor';


function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginCard />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/all-instructor' element={<Instructor />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';

import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home';
import ProtectedRoutes from './utils/ProtectedRoutes'
import { UserContext } from './context/UserContext';
import { useContext } from 'react';

function App() {
  const { loggedInUser } = useContext(UserContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoutes auth={loggedInUser.isLoggedIn} />}>
          <Route path='/' exact element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

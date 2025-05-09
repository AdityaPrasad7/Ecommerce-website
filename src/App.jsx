import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { initializeProducts } from './api/products';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import AdminCategorySelection from './components/AdminCategorySelection.jsx';
import AdminProducts from './components/AdminProducts';

function App() {
  useEffect(() => {
    initializeProducts(); // This will create products if they don't exist
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user" element={<UserDashboard />} />
          
          {/* Updated Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<AdminCategorySelection />} />
            <Route path="men" element={<AdminProducts category="Men" />} />
            <Route path="women" element={<AdminProducts category="Women" />} />
            <Route path="kids" element={<AdminProducts category="Kids" />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
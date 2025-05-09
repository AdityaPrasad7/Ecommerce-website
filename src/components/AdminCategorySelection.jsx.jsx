// components/AdminCategorySelection.jsx
import { useNavigate } from 'react-router-dom';

const AdminCategorySelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Select Category</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            onClick={() => navigate('/admin/men')}
            className="bg-blue-500 text-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-blue-600 transition-colors text-center"
          >
            <h2 className="text-xl font-bold">Men</h2>
            <p className="mt-2">Manage men's products</p>
          </div>
          
          <div 
            onClick={() => navigate('/admin/women')}
            className="bg-pink-500 text-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-pink-600 transition-colors text-center"
          >
            <h2 className="text-xl font-bold">Women</h2>
            <p className="mt-2">Manage women's products</p>
          </div>
          
          <div 
            onClick={() => navigate('/admin/kids')}
            className="bg-green-500 text-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-green-600 transition-colors text-center"
          >
            <h2 className="text-xl font-bold">Kids</h2>
            <p className="mt-2">Manage kids' products</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategorySelection;
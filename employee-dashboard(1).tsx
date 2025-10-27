import React, { useState, useEffect } from 'react';
import { Menu, Users, UserPlus, Mail, Hash } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    location: '',
    salary: ''
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setEmployees(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = () => {
    if (formData.name && formData.designation && formData.location && formData.salary) {
      alert(`Form submitted!\nName: ${formData.name}\nDesignation: ${formData.designation}\nLocation: ${formData.location}\nSalary: ${formData.salary}`);
      setFormData({ name: '', designation: '', location: '', salary: '' });
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6" />
              <span className="text-xl font-bold">Employee Portal</span>
            </div>
            <div className="flex gap-6">
              <button
                onClick={() => setCurrentPage('home')}
                className={`flex items-center gap-2 px-4 py-2 rounded transition ${
                  currentPage === 'home' ? 'bg-blue-700' : 'hover:bg-blue-500'
                }`}
              >
                <Users className="w-4 h-4" />
                Home
              </button>
              <button
                onClick={() => setCurrentPage('form')}
                className={`flex items-center gap-2 px-4 py-2 rounded transition ${
                  currentPage === 'form' ? 'bg-blue-700' : 'hover:bg-blue-500'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                Employee Form
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {currentPage === 'home' ? (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Employee Dashboard</h1>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading employees...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {employees.map((emp) => (
                  <div key={emp.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="bg-blue-100 rounded-full p-3">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">{emp.name}</h3>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Hash className="w-4 h-4" />
                        <span className="text-sm">ID: {emp.id}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{emp.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Employee Form</h1>
            
            <div className="max-w-2xl bg-white rounded-lg shadow-md p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Enter employee name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Designation *
                  </label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => handleInputChange('designation', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Enter designation"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Enter location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salary *
                  </label>
                  <input
                    type="number"
                    value={formData.salary}
                    onChange={(e) => handleInputChange('salary', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Enter salary"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
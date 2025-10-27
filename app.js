const { useState, useEffect } = React;
const { BrowserRouter, Routes, Route, Link, useLocation } = ReactRouterDOM;

// Navbar Component
function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">Employee Dashboard</Link>
        <ul className="navbar-nav">
          <li>
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/employee-form" 
              className={`nav-link ${location.pathname === '/employee-form' ? 'active' : ''}`}
            >
              Employee Form
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

// Home/Dashboard Component
function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('table');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
      if (!response.ok) {
        throw new Error('Failed to fetch employee data');
      }
      
      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderTableView = () => (
    <div className="table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderCardView = () => (
    <div className="card-grid">
      {employees.map(employee => (
        <div key={employee.id} className="employee-card">
          <span className="employee-card-id">ID: {employee.id}</span>
          <h3 className="employee-card-name">{employee.name}</h3>
          <p className="employee-card-email">{employee.email}</p>
        </div>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="employee-list">
      {employees.map(employee => (
        <div key={employee.id} className="employee-list-item">
          <div className="employee-list-header">
            <span className="employee-list-id">#{employee.id}</span>
            <h3 className="employee-list-name">{employee.name}</h3>
          </div>
          <p className="employee-list-email">{employee.email}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container">
      <h1 className="page-title">Employee Dashboard</h1>
      
      {error && (
        <div className="error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {!loading && !error && (
        <div className="view-toggle">
          <button 
            className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
          >
            Table View
          </button>
          <button 
            className={`view-btn ${viewMode === 'card' ? 'active' : ''}`}
            onClick={() => setViewMode('card')}
          >
            Card View
          </button>
          <button 
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            List View
          </button>
        </div>
      )}

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <span>Loading employees...</span>
        </div>
      )}

      {!loading && !error && (
        <div>
          {viewMode === 'table' && renderTableView()}
          {viewMode === 'card' && renderCardView()}
          {viewMode === 'list' && renderListView()}
        </div>
      )}
    </div>
  );
}

// Employee Form Component
function EmployeeForm() {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    location: '',
    salary: ''
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.salary) {
      newErrors.salary = 'Salary is required';
    } else if (isNaN(formData.salary) || Number(formData.salary) <= 0) {
      newErrors.salary = 'Please enter a valid positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Show success message
      setShowSuccess(true);
      
      // Clear form
      setFormData({
        name: '',
        designation: '',
        location: '',
        salary: ''
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="page-title">Add New Employee</h1>
        
        {showSuccess && (
          <div className="success-message">
            ✓ Employee added successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="employee-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-control ${errors.name ? 'error' : ''}`}
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="designation" className="form-label">
              Designation <span className="required">*</span>
            </label>
            <input
              type="text"
              id="designation"
              name="designation"
              className={`form-control ${errors.designation ? 'error' : ''}`}
              value={formData.designation}
              onChange={handleChange}
              placeholder="e.g., Software Engineer, Manager, Analyst"
            />
            {errors.designation && <div className="error-message">{errors.designation}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="location" className="form-label">
              Location <span className="required">*</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className={`form-control ${errors.location ? 'error' : ''}`}
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., New York, London, Mumbai"
            />
            {errors.location && <div className="error-message">{errors.location}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="salary" className="form-label">
              Salary <span className="required">*</span>
            </label>
            <input
              type="number"
              id="salary"
              name="salary"
              className={`form-control ${errors.salary ? 'error' : ''}`}
              value={formData.salary}
              onChange={handleChange}
              placeholder="e.g., 50000"
              min="0"
            />
            {errors.salary && <div className="error-message">{errors.salary}</div>}
          </div>

          <button type="submit" className="form-submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employee-form" element={<EmployeeForm />} />
      </Routes>
    </BrowserRouter>
  );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
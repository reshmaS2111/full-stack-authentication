import React, {useState, useEffect} from 'react'
import api from './api'

const App = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: ''
  });

  const fetchItems = async () => {
    const response = await api.get('/items/');
    setItems(response.data)
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await api.post('/items/', formData);
    console.log('formData',formData);
    fetchItems();
    setFormData({
      name: '',
      description: '',
      price: ''
    });
  };

  return (
    <div>
      {/* Navbar */}
      <nav className='navbar navbar-dark bg-primary'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='/'>
            Basic CRUD Operation
          </a>
        </div>
      </nav>

      {/* Form Section */}
      <div className='container my-5'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <form onSubmit={handleFormSubmit}>
              <div className='mb-3'>
                <label htmlFor='name' className='form-label'>
                  Item Name
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='name'
                  name='name'
                  onChange={handleInputChange}
                  value={formData.name}
                />
              </div>

              <div className='mb-3'>
                <label htmlFor='description' className='form-label'>
                  Item Description
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='description'
                  name='description'
                  onChange={handleInputChange}
                  value={formData.description}
                />
              </div>

              <div className='mb-3'>
                <label htmlFor='price' className='form-label'>
                  Item Price
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='price'
                  name='price'
                  onChange={handleInputChange}
                  value={formData.price}
                />
              </div>

              <button type='submit' className='btn btn-primary w-100'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className='container'>
        <h2 className='text-center my-4'>Items List</h2>
        <table className='table table-striped table-bordered'>
          <thead className='table-dark'>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

}

export default App;

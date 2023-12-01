// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

const CarFormInput = ({ type, name, value, onChange, placeholder }) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
  />
);

const CarForm = ({ onSubmit }) => {
  const initialState = {
    model: '',
    year: '',
    color: '',
  };

  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddCar = () => {
    onSubmit(formData);
    setFormData(initialState);
  };

  return (
    <div className="app-section">
      <h2>Add a Car</h2>
      <CarFormInput
        type="text"
        name="model"
        value={formData.model}
        onChange={(value) => handleInputChange('model', value)}
        placeholder="Enter car model"
      />
      <CarFormInput
        type="number"
        name="year"
        value={formData.year}
        onChange={(value) => handleInputChange('year', value)}
        placeholder="Enter car year"
      />
      <CarFormInput
        type="text"
        name="color"
        value={formData.color}
        onChange={(value) => handleInputChange('color', value)}
        placeholder="Enter car color"
      />
      <button className="app-button" onClick={handleAddCar}>
        Add Car
      </button>
    </div>
  );
};

const CarList = ({ cars }) => (
  <div className="app-section">
    <h2>Car List</h2>
    <ul className="app-file-list">
      {cars.map((car, index) => (
        <li key={index}>
          Model: {car.model}, Year: {car.year}, Color: {car.color}
        </li>
      ))}
    </ul>
  </div>
);

function App() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await fetch('https://mniprojectback7.onrender.com/v1/api/cars');
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    }

    fetchCars();
  }, []);

  const handleAddCar = async (newCar) => {
    try {
      await fetch('https://mniprojectback7.onrender.com/v1/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCar),
      });
      setCars((prevCars) => [...prevCars, newCar]);
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Welcome to the Car Management Page</h1>
      <CarForm onSubmit={handleAddCar} />
      <CarList cars={cars} />
    </div>
  );
}

export default App;


import React, { useState, useEffect } from 'react';
import './App.css';
import CrudApp from './crudApp.js';

const CarForm = ({ onSubmit }) => {
  const [car, setCar] = useState({ model: '', year: '', color: '' });

  const handleAddCar = () => {
    onSubmit(car);
    setCar({ model: '', year: '', color: '' });
  };

  return (
    <div className="app-section">
      <h2>Add a Car</h2>
      {['model', 'year', 'color'].map((field) => (
        <input
          key={field}
          type={field === 'year' ? 'number' : 'text'}
          name={field}
          value={car[field]}
          onChange={(e) => setCar({ ...car, [field]: e.target.value })}
          placeholder={`Enter car ${field}`}
        />
      ))}
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
      <CrudApp/>



    </div>
  );
}

export default App;


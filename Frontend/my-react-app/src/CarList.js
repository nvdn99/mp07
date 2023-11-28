// CarList.js
import React, { useState, useEffect } from 'react';

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/v1/api/cars')
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(error => console.error('Error fetching cars:', error));
  }, []);

  return (
    <div>
      <h1 style={{ color: 'purple' }}>Car List</h1>
      <ul>
        {cars.map(car => (
          <li key={car._id} style={{ color: 'pink' }}>
            {car.model} - {car.year} - {car.color}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;

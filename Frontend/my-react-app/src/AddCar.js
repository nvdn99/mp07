
import React, { useState } from 'react';

const AddCar = () => {
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [color, setColor] = useState('');

  const handleAddCar = () => {
    fetch('http://localhost:3001/v1/api/cars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model, year, color }),
    })
      .then(response => response.json())
      .then(data => console.log('Car added successfully:', data))
      .catch(error => console.error('Error adding car:', error));
  };

  return (
    <div>
      <h1 style={{ color: 'purple' }}>Add a New Car</h1>
      <form>
        <label>Model:</label>
        <input type="text" value={model} onChange={e => setModel(e.target.value)} /><br />
        <label>Year:</label>
        <input type="number" value={year} onChange={e => setYear(e.target.value)} /><br />
        <label>Color:</label>
        <input type="text" value={color} onChange={e => setColor(e.target.value)} /><br />
        <button type="button" onClick={handleAddCar}>Add Car</button>
      </form>
    </div>
  );
};

export default AddCar;

import React, { useState } from 'react';

const useCarForm = () => {
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [color, setColor] = useState('');

  const handleModelChange = (e) => setModel(e.target.value);
  const handleYearChange = (e) => setYear(e.target.value);
  const handleColorChange = (e) => setColor(e.target.value);

  return {
    model,
    year,
    color,
    handleModelChange,
    handleYearChange,
    handleColorChange,
  };
};

const CarForm = ({ onSubmit, ...props }) => (
  <form onSubmit={onSubmit}>
    <label>Model:</label>
    <input type="text" {...props} /><br />
    <label>Year:</label>
    <input type="number" {...props} /><br />
    <label>Color:</label>
    <input type="text" {...props} /><br />
    <button type="submit">Add Car</button>
  </form>
);

const AddCar = () => {
  const { model, year, color, handleModelChange, handleYearChange, handleColorChange } = useCarForm();

  const handleAddCar = async () => {
    try {
      const response = await fetch('http://localhost:3001/v1/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ model, year, color }),
      });

      if (!response.ok) {
        throw new Error('Error adding car');
      }

      const data = await response.json();
      console.log('Car added successfully:', data);
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddCar();
  };

  return (
    <div>
      <h1 style={{ color: 'purple' }}>Add a New Car</h1>
      <CarForm
        onSubmit={handleSubmit}
        value={model}
        onChange={handleModelChange}
        value={year}
        onChange={handleYearChange}
        value={color}
        onChange={handleColorChange}
      />
    </div>
  );
};

export default AddCar;


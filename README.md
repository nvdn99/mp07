# Car Management System

Welcome to the Car Management System, a full-stack web application for managing information about cars. This system consists of a backend server built with Node.js and Express, connected to a MongoDB database, and a frontend user interface created with React.

The Car Management System allows users to perform various operations related to cars, such as adding new cars and displaying a list of existing cars. The system is built using modern web technologies, including Node.js, Express, MongoDB, and React.

#Code Climate Grade of B

# Features

Add a Car: Users can add information about a new car, including the model, year, and color.
Display Cars: The system provides an interface to view a list of all cars stored in the database.

# Backend (Express.js)

Technologies Used:
Express.js
MongoDB (Atlas Cloud)

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Install dependencies:

    ```bash
    cd backend
    npm install
    ```

3. **Configure MongoDB:**
   - Replace the placeholder in the `uri` variable within `server.js` with your MongoDB connection string.

4. Start the server:

    ```bash
    npm start
    ```

The backend server will run on http://localhost:3002.

# Frontend (React.js)

Technologies Used:
React.js

1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the React app:

    ```bash
    npm start
    ```

The React app will run on http://localhost:3000.
Features:
Add a Car: Users can input details such as model, year, and color to add a new car to the system.
Display Cars: Users can view a list of all added cars, including their model, year, and color.

# api endpoint 

Method: POST
Request Body: JSON object with model, year, and color properties.
Display Cars:
Endpoint: /v1/api/cars
Method: GET
Response: JSON array containing information about all cars.

# Dependencies

Backend:
Node.js
Express
MongoDB
cors
Frontend:
React
react-dom
react-scripts

# Usage

To use the Car Management System, follow these steps:

1. Open your web browser and visit http://localhost:3000.

2. **Adding a Car:**
   - Click on the "Add Car" button.
   - Enter the car's model, year, and color in the form.
   - Click the "Add Car" button.

3. **Displaying Cars:**
   - Click on the "Display Cars" button to view a list of all cars stored in the system.



# mwminiproject7
# miniproject07
# miniproject07
# mp07
# mp07

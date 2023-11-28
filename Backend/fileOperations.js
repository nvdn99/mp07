


import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

 
const uri = "mongodb+srv://nvdn99:Skatingpros55@cluster0.mezdyl5.mongodb.net/";
let db;

(async function () {
   try {
       const client = await MongoClient.connect(uri, {
useUnifiedTopology: true });
       console.log('Connected to MongoDB.');
       db = client.db("carManagement");

   } catch (err) {
       console.error('Error occurred while connecting to MongoDB:', err);
   }
})();

app.use((req, res, next) => {
   console.log(`${req.method} request for ${req.url}`);
   next();
});

// Render home page with links to car operations
app.get('/', (req, res) => {
   res.send(`<button><a href="/v1/add"> Add a Car </a></button>
             <button><a href="/v1/api/cars"> Display Cars </a></button>`);
});

// API Version 1
const v1Router = express.Router();

// Render form to add a new car
v1Router.get('/add', (req, res) => {
   res.render('addCar.ejs');
});

// Add a new car
v1Router.post('/api/cars', async (req, res) => {
   const { model, year, color } = req.body;

   const newCar = {
       model,
       year,
       color
   };

   const collection = db.collection('cars');
   await collection.insertOne(newCar);
   res.json({ message: 'Car added successfully', car: newCar });
});

// Get all cars
v1Router.get('/api/cars', async (req, res) => {
   const collection = db.collection('cars');
   const cars = await collection.find({}).toArray();
   res.json(cars);
});

// Use API versioning
app.use('/v1', v1Router);

// Start the server
app.listen(port, () => {
   console.log(`Server running on http://localhost:${port}`);
});
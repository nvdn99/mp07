
import express from 'express';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import cors from 'cors';
import crudRouter from './crud.js';

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
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB.');
        db = client.db("carManagement");

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to Mongoose.');
    } catch (err) {
        console.error('Error occurred while connecting:', err);
    }
})();

app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send(`<button><a href="/v1/add"> Add a Car </a></button>
              <button><a href="/v1/api/cars"> Display Cars </a></button>`);
});

const v1Router = express.Router();
v1Router.get('/add', (req, res) => {
    res.render('addCar.ejs');
});

// Handle POST request to add a new car
v1Router.post('/api/cars', async (req, res) => {
    const { model, year, color } = req.body;

    try {
        const newCar = {
            model,
            year,
            color
        };

        const collection = db.collection('cars');
        await collection.insertOne(newCar);

        res.json({ message: 'Car added successfully', car: newCar });
    } catch (error) {
        console.error('Error adding car:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

v1Router.get('/api/cars', async (req, res) => {
    const collection = db.collection('cars');
    const cars = await collection.find({}).toArray();
    res.json(cars);
});

app.use('/v1', v1Router);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

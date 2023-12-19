// filesOperation.js
import express from 'express';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import expressSession from 'express-session';
import passportLocalMongoose from 'passport-local-mongoose';
import cookieParser from 'cookie-parser';
import { User, Car } from './schemas.js'; // Correct path to schemas.js

const app = express();
const port = 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(expressSession({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());
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
});

// User Schema with passport-local-mongoose plugin
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

userSchema.plugin(passportLocalMongoose); // Apply the plugin

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Passport Configuration
passport.use(new LocalStrategy({
   usernameField: 'username',
   passwordField: 'password',
}, async (username, password, done) => {
   try {
       const user = await User.findOne({ username });

       if (!user || !(await user.comparePassword(password))) {
           return done(null, false, { message: 'Incorrect username or password' });
       }

       return done(null, user);
   } catch (error) {
       return done(error);
   }
}));

passport.serializeUser((user, done) => {
   done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
   try {
       const user = await User.findById(id);
       done(null, user);
   } catch (error) {
       done(error);
   }
});

// Authentication Routes
const authRouter = express.Router();
app.use('/auth', authRouter);

// Register User
authRouter.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ error: 'Both username and password are required' });
        }

        console.log('Received registration request:', { username, password });

        const newUser = new User({ username, password });
        await newUser.save();
        res.json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

authRouter.get('/register', (req, res) => {
    res.render('register.ejs');
});

// Login User
authRouter.post('/login', passport.authenticate('local'), (req, res) => {
    // Set a cookie upon successful login
    res.cookie('user', JSON.stringify(req.user));
    res.json({ message: 'Login successful', user: req.user });
});

authRouter.get('/login', (req, res) => {
    res.render('login.ejs');
});

// Logout User
authRouter.get('/logout', (req, res) => {
    // Clear the user cookie upon logout
    res.clearCookie('user');
    req.logout();
    res.json({ message: 'Logout successful' });
});

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'Unauthorized' });
};

app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

// Example protected route
app.get('/protected', isAuthenticated, (req, res) => {
    res.json({ message: 'This is a protected route' });
});

app.get('/', (req, res) => {
    res.send(`<button><a href="/v1/add"> Add a Car </a></button>
              <button><a href="/v1/api/cars"> Display Cars </a></button>

              <button><a href="/auth/login">Login</a></button>
              <button><a href="/auth/register">Register</a></button>
              `);
});

const v1Router = express.Router();
v1Router.get('/add', isAuthenticated, (req, res) => {
    res.render('addCar.ejs');
});

// Handle POST request to add a new car
v1Router.post('/api/cars', isAuthenticated, async (req, res) => {
    const { model, year, color } = req.body;

    try {
        const newCar = {
            model,
            year,
            color,
            createdBy: req.user._id, // Set the createdBy field to the user's ID
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
    const cars = await collection.find({ createdBy: req.user._id }).toArray(); // Only fetch cars created by the user
    res.json(cars);
});

app.use('/v1', v1Router);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

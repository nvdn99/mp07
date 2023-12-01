
import express from 'express';
import { body, validationResult } from 'express-validator';
import { Engine } from './schemas.js';

const crudRouter = express.Router();

// Validation Middleware
const validateInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Create
crudRouter.post('/engines',
    [
        body('type').notEmpty(),
        body('horsepower').isNumeric(),
        body('fuelType').notEmpty(),
    ],
    validateInput,
    async (req, res) => {
        try {
            const newEngine = new Engine(req.body);
            await newEngine.save();
            res.json({ message: 'Engine added successfully', engine: newEngine });
        } catch (error) {
            console.error('Error adding engine:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
);

// Read
crudRouter.get('/engines', async (req, res) => {
    try {
        const engines = await Engine.find({});
        res.json(engines);
    } catch (error) {
        console.error('Error getting engines:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update (Modify as needed)
crudRouter.put('/engines/:id', async (req, res) => {
    // Update logic
});

// Delete
crudRouter.delete('/engines/:id', async (req, res) => {
    try {
        const engineId = req.params.id;
        const deletedEngine = await Engine.findByIdAndDelete(engineId);
        res.json({ message: 'Engine deleted successfully', engine: deletedEngine });
    } catch (error) {
        console.error('Error deleting engine:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default crudRouter;

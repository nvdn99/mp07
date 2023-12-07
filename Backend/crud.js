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

// Reusable function for handling engine creation
const createEngine = async (req, res) => {
    try {
        const newEngine = new Engine(req.body);
        await newEngine.save();
        return res.json({ message: 'Engine added successfully', engine: newEngine });
    } catch (error) {
        console.error('Error adding engine:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Reusable function for handling engine deletion
const deleteEngineById = async (req, res) => {
    try {
        const engineId = req.params.id;
        const deletedEngine = await Engine.findByIdAndDelete(engineId);
        return res.json({ message: 'Engine deleted successfully', engine: deletedEngine });
    } catch (error) {
        console.error('Error deleting engine:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Create
crudRouter.post('/engines',
    [
        body('type').notEmpty(),
        body('horsepower').isNumeric(),
        body('fuelType').notEmpty(),
    ],
    validateInput,
    createEngine
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
crudRouter.put('/engines/:id',
    [
        body('type').optional().notEmpty(),
        body('horsepower').optional().isNumeric(),
        body('fuelType').optional().notEmpty(),
    ],
    validateInput,
    async (req, res) => {
        try {
            const engineId = req.params.id;
            const updatedEngine = await Engine.findByIdAndUpdate(
                engineId,
                req.body,
                { new: true, runValidators: true }
            );

            if (!updatedEngine) {
                return res.status(404).json({ error: 'Engine not found' });
            }

            res.json({ message: 'Engine updated successfully', engine: updatedEngine });
        } catch (error) {
            console.error('Error updating engine:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
);

// Delete
crudRouter.delete('/engines/:id', deleteEngineById);

export default crudRouter;



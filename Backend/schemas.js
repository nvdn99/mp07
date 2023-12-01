
import mongoose from 'mongoose';

const engineSchema = new mongoose.Schema({
    type: String,
    horsepower: Number,
    fuelType: String,
});

const carFactSchema = new mongoose.Schema({
    weight: Number,
    acceleration: Number,
    topSpeed: Number,
});

const tireSchema = new mongoose.Schema({
    brand: String,
    size: String,
    type: String,
});

const Engine = mongoose.model('Engine', engineSchema);
const CarFact = mongoose.model('CarFact', carFactSchema);
const Tire = mongoose.model('Tire', tireSchema);

export { Engine, CarFact, Tire };

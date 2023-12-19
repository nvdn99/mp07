// schemas.js
import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import bcrypt from 'bcrypt';

mongoose.connect('mongodb+srv://nvdn99:Skatingpros55@cluster0.mezdyl5.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch((err) => { 
    console.error('Cannot connect to monogoDB', err);
});

const carSchema = new mongoose.Schema({
    model: String,
    year: Number,
    color: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

userSchema.plugin(passportLocalMongoose);

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

// Add the comparePassword method to your User schema
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
const Car = mongoose.model('Car', carSchema);

export { User, Car };

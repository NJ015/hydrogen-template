import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    geo: {
        lat: String,
        lng: String
    }
});

const companySchema = new mongoose.Schema({
    name: String,
    catchPhrase: String,
    bs: String
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: addressSchema,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    website: String,
    company: companySchema
});

const User = mongoose.model('User', userSchema);

export default User;

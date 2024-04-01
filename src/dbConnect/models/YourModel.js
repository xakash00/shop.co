import mongoose from 'mongoose';

const YourSchema = new mongoose.Schema({
    // Define your schema fields here
    // For example:
    name: { type: String, required: true },
    age: { type: Number },
});

const YourModel = mongoose.model('YourModel', YourSchema);

export default YourModel;
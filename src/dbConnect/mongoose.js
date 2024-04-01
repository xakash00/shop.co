import mongoose from 'mongoose';

const uri = 'mongodb+srv://xakash:1234@Mongodb@cluster0.jnxox.mongodb.net/?retryWrites=true&w=majority'; // Your MongoDB connection string

if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const connection = {};

async function connect() {
    if (connection.isConnected) {
        return;
    }

    const db = await mongoose.connect(uri, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    connection.isConnected = db.connections[0].readyState;
}

export default connect;
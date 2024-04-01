// Replace with your Mongoose model

import YourModel from "@/dbConnect/models/YourModel";
import connect from "@/dbConnect/mongoose";

export default async function handler(req, res) {
    await connect();

    if (req.method === 'GET') {
        const data = await YourModel.find({});
        res.status(200).json(data);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
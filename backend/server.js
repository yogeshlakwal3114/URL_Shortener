const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/urlShorter');

const app = express();
app.use(express.json());
app.use(cors());

const dotenv = require('dotenv');
dotenv.config();

const atlasConnection = process.env.MONGODB_URI;
mongoose.set('strictQuery', true);
mongoose.connect(atlasConnection, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect(atlasConnection, {
    serverSelectionTimeoutMS: 100000
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch(err => {
    console.error('Error connecting to MongoDB Atlas:', err);
});

app.use('/', userRoutes);

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
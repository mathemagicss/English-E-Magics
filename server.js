const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/english-emagics', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a schema for user data
const userSchema = new mongoose.Schema({
    name: String,
    grade: String,
    testResults: Array,
});

// Create a model for user data
const User = mongoose.model('User', userSchema);

// Routes
app.post('/submit-test', async (req, res) => {
    const { name, grade, testResults } = req.body;

    try {
        const user = new User({ name, grade, testResults });
        await user.save();
        res.status(200).send('Test results saved successfully');
    } catch (error) {
        res.status(500).send('Error saving test results');
    }
});

app.get('/get-results/:name', async (req, res) => {
    const { name } = req.params;

    try {
        const user = await User.findOne({ name });
        if (user) {
            res.status(200).json(user.testResults);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Error retrieving test results');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

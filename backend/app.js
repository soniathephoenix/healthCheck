const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Serve static files from the frontend/public directory
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Define a schema and model for the questionnaire responses
const responseSchema = new mongoose.Schema({
  question1: [String],
  question2: [String],
  question3: [String],
  question4: [String],
  question5: [String],
  question6: [String],
  question7: [String],
  question8: [String],
  question9: [String],
  question10: [String],
});

const Response = mongoose.model('Response', responseSchema);

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

// Define a route to handle form submissions
app.post('/submit', (req, res) => {
  const newResponse = new Response({
    question1: req.body.question1,
    question2: req.body.question2,
    question3: req.body.question3,
    question4: req.body.question4,
    question5: req.body.question5,
    question6: req.body.question6,
    question7: req.body.question7,
    question8: req.body.question8,
    question9: req.body.question9,
    question10: req.body.question10,
  });

  newResponse.save((err) => {
    if (err) {
      res.status(500).send('Error saving response to the database.');
    } else {
      res.status(200).send('Response saved successfully!');
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

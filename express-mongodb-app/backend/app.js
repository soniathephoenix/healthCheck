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
  const newResponse = new Response(req.body);

  newResponse.save((err) => {
    if (err) {
      res.status(500).send('Error saving response to the database.');
    } else {
      const result = classifyLifestyle(req.body);
      res.status(200).send(result);
    }
  });
});

// Function to classify lifestyle based on questionnaire answers
function classifyLifestyle(answers) {
  const count = { A: 0, B: 0, C: 0, D: 0 };

  Object.values(answers).forEach(answerSet => {
    answerSet.forEach(answer => {
      count[answer]++;
    });
  });

  const max = Math.max(count.A, count.B, count.C, count.D);
  if (count.A === max) {
    return 'Your lifestyle habits are classified as Poor Lifestyle Habits.';
  } else if (count.B === max) {
    return 'Your lifestyle habits are classified as Below Average Lifestyle Habits.';
  } else if (count.C === max) {
    return 'Your lifestyle habits are classified as Average Lifestyle Habits.';
  } else {
    return 'Your lifestyle habits are classified as Excellent Lifestyle Habits.';
  }
}

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

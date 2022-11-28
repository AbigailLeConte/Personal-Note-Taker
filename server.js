const express = require('express');
const path = require('path');
// Helper method for generating unique ids
// const uuid = require('./Assets/index.html');
const reviews = require('./db/db.json');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET request for reviews
app.get('/api/notes', (req, res) => {
  res.status(200).json(noteList);
});

// POST request to add a review
// NOTE: Data persistence isn't set up yet, so this will only exist in memory until we implement it
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { product, review, username } = req.body;

  // If all the required properties are present
  if (product && review && username) {
    // Variable for the object we will save
    const newReview = {
      product,
      review,
      username,
      review_id: uuid(),
    };

    const response = {
      status: 'success',
      body: newReview,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting notes');
  }
;

// GET Route for feedback page - check this link
app.get('/feedback', (req, res) =>
  res.sendFile(path.join(__dirname, './public/assets/js/404.js'))

// Wildcard route to direct users to a 404 page - check this link
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/assets/js/404.html'))
);

// GET Route
app.get('/', (req, res) => {
  res.send(
    'Use the API endpoint at <a href="http://localhost:3001/api">/api/diagnostics</a>'
  );
});

app.get('/db/diagnostics/json', (req, res) => res.json(pulls));

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
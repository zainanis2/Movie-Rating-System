const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 8081;

const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Enter your MySQL password
  database: 'dbmovie',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

//Endpoint to get top 7 movies with directors and actors
app.get('/api/movies', (req, res) => {
  const query = `
    SELECT
      m.movieID,
      m.title AS name,
      m.releasedYear AS releaseDate,
      m.certificate,
      m.runtime,
      m.genre AS genres,
      m.rating AS imdbRating,
      m.overview AS plotSummary,
      GROUP_CONCAT(DISTINCT d.directorName) AS director,
      GROUP_CONCAT(DISTINCT a.actorName) AS actors
    FROM
      movies m
      LEFT JOIN directormovie dm ON m.movieID = dm.movieID
      LEFT JOIN directors d ON dm.directorID = d.directorID
      LEFT JOIN actormovie am ON m.movieID = am.movieID
      LEFT JOIN actors a ON am.actorID = a.actorID
    GROUP BY
      m.movieID
    ORDER BY
      m.movieID
    LIMIT 7;
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing the query:', error);
      res.status(500).send('Internal Server Error');
    } else {
      // Format the data before sending it to the client
      const formattedResults = results.map(movie => ({
        movieID: movie.movieID,
        name: movie.name,
        director: movie.director.split(','),
        releaseDate: movie.releaseDate,
        imdbRating: movie.imdbRating,
        actors: movie.actors.split(','),
        genres: movie.genres.split(','),
        plotSummary: movie.plotSummary,
      }));

      console.log('Fetched movies data:', formattedResults);
      res.json(formattedResults);
    }
  });
});


// Endpoint for user registration using stored procedure
app.post('/api/register', (req, res) => {
  const { userName, email, firstName, lastName, password, dob } = req.body;

  const userCheckQuery = 'CALL userCheck(?, ?, ?, ?, ?, ?)';
  db.query(
    userCheckQuery,
    [userName, email, firstName, lastName, password, dob],
    (error, results) => {
      if (error) {
        console.error('Error calling userCheck stored procedure:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }

      // Assuming userCheck procedure doesn't return a message on success
      
      const successMessage = 'User registered successfully.';

      res.status(200).json({ success: true, message: successMessage });
    }
  );
});


app.post('/api/login', (req, res) => {
  const { userName, password, isadmin } = req.body;

  const loginQuery = 'SELECT CheckUserLogin(?, ?, ?) AS userID';
  db.query(
    loginQuery,
    [userName, password, isadmin],
    (error, results) => {
      if (error) {
        console.error('Error calling CheckUserLogin function:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }

      const userID = results[0].userID;

      if (userID !== null) {
        // User exists, handle login logic here
        const userData = { userName: userName, userID: userID, isAdmin: isadmin };
        res.status(200).json(userData);
      } else {
        // User does not exist, return appropriate response
        res.status(401).json({ error: 'Invalid username or password' });
      }
    }
  );
});


app.post('/api/addToWatchedOrDropped', (req, res) => {
  const { userID, listID, movieID } = req.body;

  // Call the stored procedure
  const query = 'CALL AddOrUpdateMovieInList(?, ?, ?)';
  db.query(query, [userID, listID, movieID], (error, results) => {
    if (error) {
      console.error('Error executing the stored procedure:', error);

      // Check for duplicate entry error
      if (error.code === 'ER_SIGNAL_EXCEPTION') {
        return res.status(400).json({
          success: false,
          message: 'Duplicate entry. Movie already exists in the list.',
        });
      }

      // For other errors
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    } else {
      // Handle success response
      console.log(results);
      return res.status(200).json({
        success: true,
        message: 'Movie added to the list successfully.',
      });
    }
  });
});

app.post('/api/addRating', (req, res) => {
  const { userID, movieID, rating } = req.body;

  // Insert rating into reviews table
  const insertQuery = 'INSERT INTO reviews (userID, movieID, rating) VALUES (?, ?, ?)';
  db.query(insertQuery, [userID, movieID, rating], (error, results) => {
    if (error) {
      console.error('Error inserting rating:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

    return res.status(200).json({ success: true, message: 'Rating added successfully.' });
  });
});

app.post('/api/search', async (req, res) => {
  try {
    const { option, search } = req.body;

    if (option === 'movie') {
      // Search in the movies table
      const [movies] = await db.query('SELECT * FROM movies WHERE title LIKE ?', [`%${search}%`]);
      res.status(200).json({ results: movies });
    } else if (option === 'actor') {
      // Search in the actormovie, actors, and movies tables
      const [actorMovies] = await db.query(
        'SELECT movies.* FROM actormovie JOIN actors ON actormovie.actorID = actors.actorID JOIN movies ON actormovie.movieID = movies.movieID WHERE actors.actorName LIKE ?',
        [`%${search}%`]
      );
      res.status(200).json({ results: actorMovies });
    } else if (option === 'director') {
      // Search in the directormovie, directors, and movies tables
      const [directorMovies] = await db.query(
        'SELECT movies.* FROM directormovie JOIN directors ON directormovie.directorID = directors.directorID JOIN movies ON directormovie.movieID = movies.movieID WHERE directors.directorName LIKE ?',
        [`%${search}%`]
      );
      res.status(200).json({ results: directorMovies });
    } else {
      // Invalid option
      res.status(400).json({ error: 'Invalid option' });
    }
  } catch (error) {
    console.error('Error searching:', error);
    res.status(500).send('Internal Server Error');
  }
});







app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


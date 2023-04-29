const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session')
const passport = require('passport')
const logger = require('morgan')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const googleAuth = require('./auth.js')

require('dotenv').config();

const app = express();
const port = 3000;
googleAuth(passport);

app.use(cors());
app.use(express.json());



app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    maxAge: 100000000,
  })
);

app.use(passport.initialize())
app.use(passport.session())
// app.use(passport.authenticate(session));

// statically serve everything in the dist folder on the route '/dist'
app.use('/dist', express.static(path.join(__dirname, '../dist/')));

// Route for all recipe related features
const recipeRouter = require('./routes/recipeRoute');
const tastyRouter = require('./routes/tastyRoute');

app.use('/tasty', tastyRouter);
app.use('/recipe', recipeRouter);

app.get('/protected', passport.authenticate(
  'google', {
    successRedirect:'http://localhost:8080/',
    failureRedirect:'http:///localhost:8080'
  }
)
  )

app.get('/auth/google', (req, res, next) => {
  console.log('inside auth google')
  return next()
},
  passport.authenticate('google', {scope: ['email', 'profile']})
)

app.get('/auth', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

// app.get('/auth', authRouter);
// // serve index.html on the route '/'.
// // The '/*' is to make sure refresh in browser works with frontend routing (https://ui.dev/react-router-cannot-get-url-refresh)
// if (process.env.NODE_ENV === 'production') {
//   app.get('/*', (req, res) =>
//     res.status(200).sendFile(path.join(__dirname, '../dist/index.html'))
//   );
// }

/*
 * To-Do: Add a 404 page backup route
 */

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

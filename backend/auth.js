const express = require('express')
const app = express()
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'LgRrrKa6cTuJbHNiaCiD7-knJx6r7zqm-yt7Qo2D1PrvDN8Gy4L6jcUBUhkZcYtQ',
  baseURL: 'http://localhost:3000',
  clientID: '2hZqGJvGZQQZbO8NN2HZGhNzgxvHvHel',
  issuerBaseURL: 'https://dev-41gh05m6xvxmfgor.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.listen(3000)

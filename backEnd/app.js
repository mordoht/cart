const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const fs = require('fs');
const serveStatic = require('serve-static');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const secret = 'supersecret';

// serve front-end application
app.use('/', serveStatic(path.join(__dirname, '..', '/dist/')));

app.post('/api/register', (req, res) => {
  const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));

  users.forEach((user) => {
    if (user.username === req.body.username) {
      res.status(400)
        .send({
          message: 'Il y a déja un compte avec ce pseudo',
        });
    }
  });

  const saltRounds = 10;
  const hash = bcrypt.hashSync(req.body.password, saltRounds);

  users.push({ username: req.body.username, password: hash });
  const json = JSON.stringify(users);
  fs.writeFileSync('users.json', json, 'utf8');

  const bodyToken = {
    username: req.body.username,
  };

  const token = jwt.sign(bodyToken, secret, {
    expiresIn: '1d',
  });

  res.send({ message: 'Inscription réussie. Vous êtes maintenant connecté', token });
});

app.post('/api/login', (req, res) => {
  const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
  let found = false;
  users.forEach((user) => {
    if (user.email === req.body.email
      && bcrypt.compareSync(req.body.password, user.password)) {
      found = true;
    }
  });
  if (found) {
    const bodyToken = {
      username: req.body.username,
    };

    const token = jwt.sign(bodyToken, secret, {
      expiresIn: '1d',
    });
    res.send({ message: 'Vous êtes maintenant connecté', token });
  } else {
    res.status(400).send({ message: 'Mauvais identifiant ou mot de passe' });
  }
});

app.post('/api/submitOrder', (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedPayload = jwt.verify(token, secret);
    const username = decodedPayload.username;

    const orders = JSON.parse(fs.readFileSync('orders.json', 'utf8'));
    orders.push({
      username,
      orders: req.body.orders,
    });
    fs.writeFileSync('orders.json', JSON.stringify(orders), 'utf8');
    res.send({
      message: 'Votre commande a bien été envoyée'
    });
  } catch (err) {
    console.log(err);
    if (err.name === 'TokenExpiredError') {
      res.status(400).send({
        message: 'Votre session est expirée, veuillez-vous reconnecter',
      });
    } else {
      res.status(400).send({
        message: 'Votre session est invalide, veuillez-vous reconnecter',
      });
    }
  }
});

app.listen(3000, () => {
  console.log('Ecoute du back-end sur le port 80!');
});

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(express.static('public'));

const PORT = process.env.PORT || 4001;

const cards = [
  {
    id: 1,
    suit: 'Clubs',
    rank: '2'
  },
  {
    id: 2,
    suit: 'Diamonds',
    rank: 'Jack'
  },
  {
    id: 3,
    suit: 'Hearts',
    rank: '10'
  }
];
let nextId = 4;

// Logging
if (!process.env.IS_TEST_ENV) {
  app.use(morgan('short'));
}

// Parsing
app.use(bodyParser.json());

// Find card
app.use('/cards/:cardId', (req, res, next) => {
  const cardId = Number(req.params.cardId);
  const cardIndex = cards.findIndex(card => card.id === cardId);
  if (cardIndex === -1) {
    return res.status(404).send('Card not found');
  }
  req.cardIndex = cardIndex;
  next();
});

const validateCard = (req, res, next) => {
  const newCard = req.body;
  const validSuits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
  const validRanks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
  if (validSuits.indexOf(newCard.suit) === -1 || validRanks.indexOf(newCard.rank) === -1) {
    return res.status(400).send('Invalid card!');
  }
  next();
};

// Get all Cards
app.get('/cards/', (req, res, next) => {
  res.send(cards);
});

// Create a new Card
app.post('/cards/', validateCard, (req, res, next) => {
  const newCard = req.body;
  newCard.id = nextId++;
  cards.push(newCard);
  res.status(201).send(newCard);
});

// Get a single Card
app.get('/cards/:cardId', (req, res, next) => {
  res.send(cards[req.cardIndex]);
});

// Update a Card
app.put('/cards/:cardId', validateCard, (req, res, next) => {
  const newCard = req.body;
  const cardId = Number(req.params.cardId);
  if (!newCard.id || newCard.id !== cardId) {
    newCard.id = cardId;
  }
  cards[req.cardIndex] = newCard;
  res.send(newCard);
});

// Delete a Card
app.delete('/cards/:cardId', (req, res, next) => {
  cards.splice(req.cardIndex, 1);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

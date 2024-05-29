const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const posts = require('./data');

const app = express();
app.use(cors());

//* Middlewares
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/post', (req, res) => {
    res.send(posts);
});

app.post('/api/post', (req, res) => {
    const newPost = { userId: 1, id: posts.length + 1, ...req.body};

    posts.unshift(newPost)

    res.status(201).send(newPost)
});

app.listen(3000, () => {
    console.log('App running at port 3000');
});

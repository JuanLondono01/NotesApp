const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
let posts = require('./data');

const app = express();

//* Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/api/post', (req, res) => {
    res.send(posts);

});

app.post('/api/post', (req, res) => {
    const newPost = { userId: 1, id: posts.length + 1, ...req.body };

    posts.unshift(newPost);
    console.log(req.body);
    res.status(201).send(newPost);
});

app.delete('/api/post/:id', (req, res) => {
    const noteFound = posts.find((p) => p.id === parseInt(req.params.id));

    if (!noteFound) {
        return res.status(404).json({
            message: 'Note not found'
        })
    }

    posts = posts.filter((p) => p.id !== parseInt(req.params.id))

    res.status(200).send(posts)
});

app.listen(3000, () => {
    console.log('App running at port 3000');
});

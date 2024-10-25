import express from 'express';
// import bodyParser from 'body-parser';
import {randomBytes} from 'crypto';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));



const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts)

});

app.post('/posts', (req, res)=> {
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;
    posts[id] = {id, title};
    res.status(201).json(posts[id])
});

app.listen(4000, (host)=> {
    console.log(`Posts microservice running on port ${4000}`)
})

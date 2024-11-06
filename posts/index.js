import express from 'express';
// import bodyParser from 'body-parser';
import {randomBytes} from 'crypto';
import cors from 'cors';
import axios from "axios";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.use(cors({
//     origin: ['http://localhost:3001', 'http://localhost:3000'],
// }));



app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.json(posts)
});

app.post('/posts/create', async (req, res)=> {
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;
    posts[id] = {id, title};

    try {
        await axios.post('http://event-bus-srv:4005/events',{
            type: 'PostCreated',
            data: {id, title}
        })
    } catch (err) {
        console.error(err)
    }
    console.log(posts);
    res.status(201).json(posts[id])
});



app.post('/events', (req, res)=> {
    console.log('Event Received', req.body.type);
    res.json({})
});

app.listen(4000, ()=> {
    console.log('V110000');
    console.log(`Posts microservice running on port ${4000}`)
})

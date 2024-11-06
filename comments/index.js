import express from 'express';
import {randomBytes} from 'crypto';
import cors from 'cors';
import axios from "axios";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    res.json(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const postId = req.params.id;
    const {content} = req.body;

    const comments = commentsByPostId[postId] || [];
    comments.push({id: commentId, content: content, status: 'pending'})
    commentsByPostId[postId] = comments;

    axios.post('http://event-bus-srv:4005/events',{
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            status: 'pending',
            postId
        }

    }).catch(err => console.error(err.message));
    res.status(201).json(comments);

});

app.post('/events', async (req, res)=> {
    console.log('Event Received', req.body.type);
    const {type, data} = req.body;
    if(type === 'CommentModerated') {

        const {postId, id, status} = data;
        const comments = commentsByPostId[postId];
        const comment =  comments.find(comment => comment.id === id)
        comment.status = status;


        try {

            await axios.post('http://event-bus-srv:4005/events', {
                type: "CommentUpdated",
                data: {...comment, postId}
            })

        } catch (e) {
            console.error(e)
        }

    }

    res.json({})
});

app.listen(4001, ()=> {
    console.log(`Comments microservice running on port ${4001}`)
})

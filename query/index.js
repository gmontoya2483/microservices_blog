import express from 'express';
import cors from  'cors'
import axios from "axios";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
const posts = {};


const handleEvent = (type, data) => {
    if (type === 'PostCreated') {
        const {id, title} = data;
        posts[id] = {id, title, comments: []};
    }

    if (type === 'CommentCreated') {
        const {id, content, status, postId } = data;
        const post = posts[postId];
        post.comments.push({ id, content, status});

    }

    if (type === 'CommentUpdated') {


        const {id, content, status, postId} =  data;
        const comment = posts[postId].comments.find(comment => comment.id === id);
        comment.status = status;
        comment.content = content;


    }
}


app.get('/posts', (req, res)=> {
    res.json(posts);
})

app.post('/events', (req, res)=> {
    const { type, data } = req.body;
    handleEvent(type, data)
    res.json({});

});

app.listen(4002, async () => {
    console.log('Query microservice running on port 4002');

    try {
        const res = await axios.get('http://event-bus-srv:4005/events');

        res.data.forEach(({type, data}) => {
            console.log('Processing event: ', type);
            handleEvent(type, data);
        });




    } catch (err) {
        console.log(err);
    }

});
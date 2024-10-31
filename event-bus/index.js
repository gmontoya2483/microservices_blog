import express from 'express';
import axios from "axios";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const events = [];


app.post('/events', (req, res) => {

    const event = req.body;

    events.push(event);

    axios.post('http://localhost:4000/events', event).catch((err) => {
        console.error('http://localhost:4000/events',err.message);
    });
    axios.post('http://localhost:4001/events', event).catch((err) => {
        console.error('http://localhost:4001/events',err.message);
    });
    axios.post('http://localhost:4002/events', event).catch((err) => {
        console.error('http://localhost:4002/events' ,err.message);
    });

    axios.post('http://localhost:4003/events', event).catch((err) => {
        console.error('http://localhost:4003/events' ,err.message);
    });


    res.status(201).json({ status: 'OK' });
});


app.get('/events', (req, res) => {
    res.json(events);
})



app.listen(4005, ()=> {
    console.log(`Event Bus started on port 4005`);
});
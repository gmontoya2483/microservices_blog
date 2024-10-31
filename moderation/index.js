import express from 'express';
import axios from "axios";
 const app = express();

 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));

 app.post('/events', (req, res) => {

  const { type, data } = req.body;

  if(type === 'CommentCreated') {
   const status = data.content.includes('orange') ? 'rejected' : 'approved';

   axios.post('http://localhost:4005/events', {
    type: "CommentModerated",
    data : {
     ...data,
     status
    }
   }).catch((err) => {
    console.error(err)
   })
  }

  res.json({});

 });

 app.listen(4003, ()=>{
 console.log('Moderation service running on port 4003');
 });
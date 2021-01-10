const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const mongoose = require('mongoose')
const url = 'mongodb+srv://dsadmin:testowiec123@dscluster.842t7.mongodb.net/news?retryWrites=true&w=majority'
const socket = require("socket.io");
mongoose.connect(url, { useNewUrlParser: true })
const db = mongoose.connection;
const News = require('./models/News')
const faker = require('faker');



faker.locale="pl";
const cors = require('cors');
const decodeIDToken = require('./tokenService');

app.use(cors());
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
//live
const PORT = 9001;
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
const io = require('socket.io')(server);
  app.use(decodeIDToken);
  io.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client */

    console.log('new client connected');
});

//routes

//new news
app.get('/', (req, res) => {
  
    res.sendFile(__dirname + '/index.html')
  })
  app.post('/news', (req, res) => {
    const auth = req.currentUser;
    console.log(auth)
    if(auth){
        console.log('authenticated!', auth);
   var newNews=new News({
       _id:new mongoose.Types.ObjectId(),
       title:req.body.title,
       content:req.body.content,
       description:req.body.description,
       added:new Date()
   });

   newNews.save(function(err, data) {
    if(err) {
        console.log(error);
        res.status(500).send("Błąd dodawania newsa");
    }
    else {
        res.status(200).send("News dodany");
    }
});
    }
    else{
        res.status(403).send("Brak dostępu")
    }
  })
  app.get('/news/comments', function(req, res) {
    var howMuch=(Math.random() * 10) + 1;
    var result=[];
    for(var a =0;a<=howMuch;a++){
        faker.seed(a)
        result.push({name:faker.name.findName(),image:faker.image.image(),text:faker.lorem.text()})
    }
    res.status(200).send(result);
    });
  //get all
  app.get('/news', function(req, res) {
  News.find(function(err, data) {
    if(err){
        console.log(err);
        
    }
    else{
        res.status(200).send(data);
    }
})
})
 //get by id 
 app.get('/news/:id', function(req, res) {
    News.findById(req.params.id, function(err, data) {
            if(err){
                console.log(err);
            }
            else{
                res.status(200).send(data);
            }
        });
   });
   //delete
 app.delete('/news/:id', function(req, res) {
    News.findByIdAndDelete(req.params.id, function(err, data) {
            if(err){
                console.log(err);
            }
            else{
                res.status(200).send(data);
                console.log("Usunięto");
            }
        });
   });
//patch
app.patch('/news', function(req, res) {
    News.findByIdAndUpdate(req.body.id, 
    {
        title:req.body.title,
        content:req.body.content,
        description:req.body.description,
    },
     function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
            console.log("Data updated!");
        }
    });  
});


app.listen(9000, function() {
    console.log('listening on 9000')
  })
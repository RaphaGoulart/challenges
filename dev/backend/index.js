const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const express = require('express');
const io = require("socket.io-client");

const Threat = require('./models/Threat');
const Hero = require('./models/Hero');

const app = express();
const socket = io("https://zrp-challenge-socket.herokuapp.com/");

const auth = require('./routes/auth');
const users = require('./routes/users');
const heroes = require('./routes/heroes');
const threats = require('./routes/threats');

app.use(bodyParser.json());

//microsservicos
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/heroes', verifyToken, heroes);
app.use('/api/threats', verifyToken, threats);


//conexao com MongoDB
mongoose
	.connect('mongodb://db:27017/', {
    	useNewUrlParser: true
	})
	.then(result => {
		console.log('MongoDB connected')
	})
	.catch(error => {
		console.log(error)
	});

//servidor
app.listen(9000, () => {
	console.log('Server running on port 9000')
});

//conexao com socket
socket.on("connect", () => {
  	console.log("Connected to socket")
});

//escutando evento de ameacas
socket.on("occurrence", async (data) => {
  
  let rank;
  let hero, threat;

  switch(data.dangerLevel){
    case 'God': 
      rank = 'S'
      break
    case 'Dragon':
      rank = 'A'
      break
    case 'Tiger':
      rank = 'B'
      break
    case 'Wolf':
      rank = 'C'
      break
  }

  //encontra heroi adequado
  await Hero.find({
    class: rank,
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [data.location[0].lat, data.location[0].lng]
        }
      }
    }
  })
  .then(heroes => {
      hero = heroes[0]
  })

  //aloca heroi
  await Hero.findOneAndUpdate({ _id: hero._id }, { allocated: true })

  //guarda historico da ameaca
  threat = await new Threat({
    location: {
      type: "Point",
      coordinates: [data.location[0].lat, data.location[0].lng]
    }, 
    dangerLevel: data.dangerLevel,
    monsterName: data.monsterName,
    hero: hero.name
  }).save()

  //desaloca heroi
  await Hero.findOneAndUpdate({ _id: hero._id }, { allocated: false })

}); 

//middleware para verificacao do token de autenticacao que sera utilizado nas requisicoes
function verifyToken(req, res, next){
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' })
    
    jwt.verify(token, 'SECRET_TOKEN', function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
      req.userId = decoded.id
      next()
    });
}
const express = require('express')

const routerUser = require("./routes/user.js")
const routerGroup = require("./routes/group.js")
const routerAchievements = require("./routes/achievements.js")
const routerImage = require("./routes/image.js")
const cors = require('cors')

const port = 8000

const app = express()
const { createServer } = require('node:http');
const server = createServer(app);
const io = require('socket.io')
(server, {
    cors: {
      origin: '*',
    }
});


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/user', routerUser)
app.use('/group', routerGroup)
app.use('/achievements', routerAchievements)
app.use('/image', routerImage)

io.on('connection', (socket) => { 
    console.log('a user connected');
});
 

server.listen(port, () => {
    console.log('listening on port')
})
const express = require('express')
const cors = require('cors')

const routerUser = require("./routes/user.js")
const routerGroup = require("./routes/group.js") 
const routerAchievements = require("./routes/achievements.js")
const routerImage = require("./routes/image.js")
const routerMessages = require("./routes/messages.js") 
const db = require('../database/index.js')
const { userCheckIo } = require("./routes/test.js")

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
app.use('/messages', routerMessages)

io.on('connection', (socket) => { 
    socket.on("send",(arg)=>{
        userCheckIo(arg.token,(user)=>{
            db.Messages.create({value:arg.message,steamid:user.dataValues.steamID,groupid:arg.group,name:user.dataValues.name}).then((message)=>{
                message.dataValues["avatar"] = user.dataValues.avatar
                io.emit(`message:${arg.group}`,message.dataValues)
            })
        })
    })
    socket.on("delete",(arg)=>{
        userCheckIo(arg.token,(user)=>{
            db.Messages.destroy({where:{id:arg.id}})
            io.emit(`deleteMessage:${arg.groupId}`,arg)
        })
    })
});

server.listen(port, () => {
    console.log('listening on port') 
}) 
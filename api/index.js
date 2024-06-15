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
            db.UserStats.increment("sentMessages", {by: 1, where: {steamID: user.dataValues.steamID}})
            db.GroupsStats.increment("sentMessages", {by: 1, where: {groupID: arg.group}})
            db.Messages.create({value:arg.message,steamid:user.dataValues.steamID,groupid:arg.group,name:user.dataValues.name}).then((message)=>{
                message.dataValues["avatar"] = user.dataValues.avatar
                io.emit(`message:${arg.group}`,message.dataValues)
                db.UserAchievements.findAll().then((resu) => {
                    resu.map((resl) => {
                        console.log("THIS IS RESU ALL", resl.value)
                        db.UserStats.findOne({where: {steamID: user.dataValues.steamID, sentMessages: resl.value}}).then((result) => {
                            db.AchievementsUser.findOne({where: {UserAchievementId: resl.id, UserSteamID: user.dataValues.steamID}}).then((negative) => {
                                if(!negative){
                                    if (result || result != null || result != undefined){
                                        db.AchievementsUser.create({UserSteamID: user.dataValues.steamID, UserAchievementId: resl.id})
                                        console.log("Result is positive", result)
                                    } else {
                                        console.log('Result is negative:', result)
                                        console.log("This is user's steamID", user.dataValues.steamID)
                                    }
                                }
                            })
                        })
                    })
                })
                db.GroupAchievements.findAll().then((resut) => {
                    resut.map((reslt) => {
                        db.GroupsStats.findOne({where: {groupID: arg.group, sentMessages: reslt.value}}).then((resul) => {
                            if (resul || resul != null || resul != undefined){
                                db.AchievementsGroup.create({GroupId: arg.group, GroupAchievementId: reslt.id})
                            }
                        }) 
                    })
                })
            })
        })
    })
    socket.on("delete",(arg)=>{
        userCheckIo(arg.token,(user)=>{ 
            db.UserStats.increment("deletedMessages", {by: 1, where: {steamID: user.dataValues.steamID}})
            db.GroupsStats.increment("deletedMessages", {by: 1, where: {groupID: arg.id}})
            db.Messages.destroy({where:{id:arg.id}})
            db.UserAchievements.findAll().then((resul) => {
                resul.map((resl) => {
                        db.UserStats.findOne({where: {steamID: user.dataValues.steamID, deletedMessages: resl.value}}).then((result) => {
                            if (result || result != null | result != undefined){
                                db.AchievementsUser.create({UserAchievementId: result.id ,UserSteamID: user.dataValues.steamID})
                            }
                        })
                    })
                })
            db.GroupAchievements.findAll().then((resul1) => {
                resul1.map((resl1) => {
                    db.GroupsStats.findOne({where: {groupID: arg.id, deletedMessages: resl1.value}}).then((result1) => {
                        if (result1 || result1 != null | result1 != undefined){
                            db.AchievementsGroup.create({GroupId: arg.id, GroupAchievementId: result1.id})
                        }
                    })
                })
            })

            })
        })
        
    socket.on("mute",(arg)=>{
        fetch("http://localhost:8000/group/mute/",{
            method:"POST",
            headers:{
                token:arg.token,
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                groupId:arg.group,
                targetId:arg.target
            })
        }).then((resp)=>{ 
            return resp.json()
        }).then((rp)=>{
            if(rp.code==200){
                io.emit(`mute:${arg.group}:${arg.target}`,rp.status)
            }
        })
    })
});

server.listen(port, () => {
    console.log('listening on port') 
}) 
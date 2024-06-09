const express = require('express')

const db = require('../../database/index.js')

const router = express.Router()

const { userCheck } = require("./test.js")

router.get("/group/:id",(req,res)=>{
    userCheck(req,res,(user)=>{
        const id = Number(req.params.id)
        db.UsersGroup.findOne({where:{UserSteamID:user.dataValues.steamID,GroupId:id}}).then((group)=>{
            if(!group || group == null){
                return res.status(403).json({
                    code:403,
                    error:"User hasn`t joined this group yet"
                })
            }
            db.Messages.findAll({where:{groupid:id}}).then((messages)=>{
                return res.status(200).json({
                    code:200,
                    messages:messages
                })
            })
        })
    })
})

module.exports = router
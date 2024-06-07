const express = require('express')
const db = require('../../database/index.js')
const SteamAuth = require("node-steam-openid");
const userCheck = require("./test.js")
const crypto = require("crypto");
const cors = require('cors')
const session = require('express-session');

const router = express.Router()

router.use(cors())
router.use(session({ secret: crypto.randomBytes(16).toString("hex"), resave: false, saveUninitialized: true }));

const steam = new SteamAuth({
  realm: "http://localhost:8000",
  returnUrl: "http://localhost:8000/user/auth/steam/authenticate/",
  apiKey: "249943650812803C36038EAB00FB1AB5"
});
  
router.get("/auth",async (req, res)=>{
  const token = req.headers.token 
  if(!token || token == null){
    const redirectUrl = await steam.getRedirectUrl()
    // console.log(redirectUrl)
    return res.redirect(redirectUrl);
  }
  db.User.findOne({where:{token:token}}).then(async (user)=>{
    if(user == null || !user){
      const redirectUrl = await steam.getRedirectUrl()
      return res.json({
        code:403,
        error:"Invalid token"
      });
    } else {
      return res.status(200).json({
        code:200,
        info:user.dataValues
      })
    }
  })
  
})

router.get("/auth/steam/authenticate",async (req, res) => {
  try {   
    const user = await steam.authenticate(req) 
    db.User.findOne({where:{steamID:user.steamid}}).then((userDB)=>{
      if (userDB == null){
        const cd = crypto.randomBytes(7).toString("hex")
        console.log(user._json)
        db.User.create({steamID:user.steamid,token:crypto.randomBytes(16).toString("hex"),code:cd,avatar:user.avatar.large,name:user._json.personaname}).then((uss)=>{
          const info = uss.dataValues 
          return res.redirect(`http://localhost:3000/profile/${info.token}`)
        })
      } else {
        const info = userDB.dataValues
        return res.redirect(`http://localhost:3000/profile/${info.token}`)
      }
    })
  } catch (error){
    console.error(error);
  }
});

router.get("/auth/code",(req,res)=>{
  userCheck(req,res,(user)=>{
    const cd = crypto.randomBytes(3).toString("hex")
    user.update({code:cd})
    user.save()
    setTimeout(()=>{
      const cd1 = crypto.randomBytes(4).toString("hex")
      user.update({code:cd1})
      user.save()
    },60000)
    return res.status(200).json({
      code:200,
      authCode: cd
    })
  })
})

router.post('/auth/code',(req,res)=>{
  const code = req.query.code
  if(!code || code == null){
    return res.status(400).json({
      code:400,
      error:"Code must exist"
    })
  }

  db.User.findOne({where:{code:code}}).then((user)=>{
    if(user){
      return res.status(200).json({
        code:200,
        info:user.dataValues
      })
    } else {
      return res.status(404).json({
        code:200,
        error:"User wasn`t found"
      })
    }
  })

})

router.get("/achievements", async (req,res)=>{
    userCheck(req, res, (user) => {
      console.log(user.dataValues)
      db.AchievementsUser.findAll({where:{UserSteamID:user.dataValues.steamID},attributes:['UserAchievementId'] }).then(async (achievs)=>{
        let data = []
        for await (let i of achievs){
          await db.UserAchievements.findOne({where:{id:i["UserAchievementId"]}}).then(async (result)=>{
            if(result){
              data.push(result.dataValues)
              console.log("THIS IS DATA LENGTH", data)
            }
          })
        }
        if(data.length > 0){
          return res.status(200).json({
            code: 200,
            message: data
          })
        }
      })
    })
  })

router.post("/achievements",(req,res)=>{
  userCheck(req, res, (user) => {
    const id = Number(req.query.id)
    if (!id || id == null || `${id}` == 'Nan'){
      return res.status(400).json({
        code:400,
        message:"Id is required"
      })
    }
    db.UserAchievements.findOne({where:{id:id}}).then((achive) => {
      if(!achive || achive == null){
        return res.status(404).json({
          code:404,
          error:"Achievement wasn`t found"
        })
      }
      db.AchievementsUser.findOne({where:{UserSteamID:user.dataValues.steamID,UserAchievementId:achive.dataValues.id}}).then((pair)=>{
        if(pair || pair != null){
          return res.status(405).json({
            code:405,
            error:"User already have this achievement"
          })
        }
        db.AchievementsUser.create({UserSteamID:user.dataValues.steamID,UserAchievementId:achive.dataValues.id}).then((result)=>{
          return res.status(201).json({
            code:201,
            message:"Achievement added to user"
          })
        })
      })
    })
  })
})


module.exports = router 
const express = require('express')

const db = require('../../database/index.js')

const router = express.Router()

const SteamAuth = require("node-steam-openid");

const steam = new SteamAuth({
  realm: "http://localhost:3000",
  returnUrl: "http://localhost:3000/auth/",
  apiKey: "249943650812803C36038EAB00FB1AB5"
});

router.post('/',(req,res)=>{
    
})

router.get("/auth", async (req, res)=>{
  const redirectUrl = await steam.getRedirectUrl();
  return res.redirect(redirectUrl);
})



module.exports = router
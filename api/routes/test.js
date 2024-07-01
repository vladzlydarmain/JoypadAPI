const db = require('../../database/index.js')

function userCheck(req,res,callback){
    const token = req.headers.token
    if(!token || token == null){
      return res.status(400).json({
        status:400,
        message:"Token not found"
      })
    }
    db.User.findOne({where:{token:token}}).then((user)=>{
    if(user != null || user != undefined){
        callback(user)
      } else {
        return res.status(404).json({
          status:404,
          message:"User not found"
        })
      }
    })
}

function userCheckIo(token,callback){
  if(!token || token == null){
    return res.status(400).json({
      status:400,
      message:"Token not found"
    })
  }
  db.User.findOne({where:{token:token}}).then((user)=>{
  if(user != null || user != undefined){
      callback(user)
    }
  })
}

module.exports = {
  userCheck:userCheck,
  userCheckIo:userCheckIo
}

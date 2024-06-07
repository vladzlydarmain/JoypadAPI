const db = require('../../database/index.js')

function userCheck(req,res,callback){
    const token = req.headers.token
    console.log(token)
    if(!token || token == null){
      return res.status(404).json({
        status:404,
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

module.exports = userCheck
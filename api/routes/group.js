const express = require('express')

const db = require('../../database/index.js')

const router = express.Router()

const { userCheck } = require("./test.js")

const crypto = require("crypto");
const { error } = require('console');

router.post('/', (req, res) => {
    userCheck(req, res, (user) => {
        const name = req.body.name
        const description = req.body.description
        const admin_id = user.dataValues.steamID
        const users = []
        const category = req.body.category

        if(!name|| name == null){ 
            return res.status(400).json({
                code: 400,
                error: "Name must exist"
            }) 
        }
        if(!description|| description == null){
            return res.status(400).json({
                code: 400,
                error: "Description must exist"
            })
        }
        if(!category|| category == null){
            return res.status(400).json({ 
                code: 400,
                error: "Description must exist"
            })
        }
        const cd = crypto.randomBytes(3).toString("hex")
        db.Group.create({name: name,description: description,admin_id: admin_id, points: 0, category: category, code:cd}).then((group) => {
            console.log("THIS IS GROUP", group)
            
            db.UsersGroup.create({UserSteamID:user.dataValues.steamID,GroupId:group.dataValues.id})
            
            res.status(201).json({
                code: 201,
                message: `Successfuly created group with id of ${group.dataValues.id}`,
                id:group.dataValues.id,
                owner: admin_id
            })
        })       
    })
})

router.get('/all', (req, res) => {
    db.Group.findAll().then((result) => {
        res.status(200).json({
            code: 200,
            groups: result
        })
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    db.Group.findOne({where:{id:id}}).then((result) => {
        if (result){
            return res.status(200).json({
                code: 200,
                groups: result
            })
        } else {
            return res.status(404).json({
                code: 404,
                error: "No groups were found"
            })
        }
    })
})

router.delete('/:id', (req, res) => {
    userCheck(req, res, (user) => {
        const id = req.params.id
        db.Group.findOne({where:{admin_id: user.dataValues.steamID,id:id}}).then((resul) => {
            if(!resul || resul == null){
                return res.status(404).json({
                    code: 404,
                    error: "No groups with that steam id were found"
                })
            }

            db.Group.destroy({where:{admin_id: user.dataValues.steamID,id:id}})
            res.status(200).json({
                code: 200,
                message: `Group was successfully deleted`
            })    
        })   
    })
})
 
router.post('/user', (req, res) => {
    const code = req.query.code
    if(!code|| code == null){
        return res.status(400).json({
            code:400,
            error:"Code is required"
        })
    }
    userCheck(req, res, (user) => {
        db.Group.findOne({where: {code: code}}).then((group) => {
            if(!group){
                return res.status(404).json({
                    code:404,
                    error:"Group wasn`t found"
                })
            }
            db.UsersGroup.findOne({where:{UserSteamID:user.dataValues.steamID,GroupId:group.dataValues.id}}).then((inf)=>{
                if(inf){
                    return res.status(405).json({
                        code:405,
                        error:"User already exist in this group"
                    })
                }
                db.UsersGroup.create({UserSteamID:user.dataValues.steamID,GroupId:group.dataValues.id})
                return res.status(200).json({
                    code:200,
                    message:"User successfuly joined this group"
                })
            })
        })
    })
})

router.delete('/user/:id',(req,res)=>{
    userCheck(req, res, (user) => {
        const id = Number(req.params.id)
        fetch(`http://localhost:8000/group/${id}`,{
            method:"GET"
        }).then((grp)=>{
            return grp.json()
        }).then((group)=>{
            if(group.code != 200){
                return res.status(group.code).json({
                    code:group.code,
                    error:group.error
                })
            }

            db.UsersGroup.findOne({where:{UserSteamID:user.dataValues.steamID,GroupId:id}}).then((inf)=>{
                if(!inf || inf == null){
                    return res.status(405).json({
                        code:405,
                        error:"User hasn`t joined this group yet"
                    })
                }
                db.UsersGroup.destroy({where:{UserSteamID:user.dataValues.steamID,GroupId:id}})
                if(group.groups.admin_id == user.dataValues.steamID){
                    db.Group.destroy({where:{id:group.groups.id}})
                }
                return res.status(200).json({
                    code:200,
                    message:"User successfully left/deleted(for admins of group) this group"
                })
            })
        })
    })
})

router.get("/users/:id",(req,res)=>{
    const id = req.params.id
    fetch(`http://localhost:8000/group/${id}`,{
        method:"GET"
    }).then((grp)=>{
        return grp.json()
    }).then((group)=>{
        if(group.code != 200){
            return res.status(group.code).json({
                code:group.code,
                error:group.error
            })
        }
        db.UsersGroup.findAll({where:{GroupId:id}, attributes:["UserSteamID"]}).then(async(users)=>{
            const avatars = {}
            for await(let user of users){
                await db.User.findOne({where:{steamID:user.UserSteamID},attributes:["avatar"]}).then((avatar)=>{
                    avatars[`${user.UserSteamID}`] = avatar.dataValues.avatar
                })
            }
            return res.status(200).json({
                code:200,
                avatars:avatars
            })
        })
    })
  })

router.post('/category', (req, res) => {
    const name = req.body.name

    db.Category.create({name: name}).then((result) => {
        return res.status(201).json({
            code: 201,
            message: `Category was created with id of ${result.id}`,
            id:result.id
        })
    }) 
})

router.get('/category/all', (req, res) => {
    db.Category.findAll().then((result) => {
        return res.status(200).json({
            code: 200,
            message: result
        })
    })
})

router.get('/category/:id', (req, res) => {
    const id = req.params.id
    db.Category.findOne({where: {id: id}}).then((result) => {
        return res.status(200).json({
            code: 200,
            message: result 
        })
    })
})

router.get('/:id/category', (req, res) => {
    const id = Number(req.params.id)
    db.Group.findAll({where: {category: id}}).then((result) => {
        
        if(!result || result == null || result == "null"|| result.length < 1){
            return res.status(404).json({
                code: 404,
                error: "No categories were found"
            })
        }
        return res.status(200).json({
            code: 200,
            message: result
        })
    })
})

module.exports = router
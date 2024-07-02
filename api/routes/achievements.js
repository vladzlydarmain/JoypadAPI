const express = require('express')

const db = require('../../database/index.js')

const router = express.Router()

router.post('/user', (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const categoryId = req.body.category
    const value = req.body.value

    if(!name){
        return res.status(400).json({
            code: 400,
            error: "Name must exist"
        })
    }
    if(!description){
        return res.status(400).json({
            code: 400,
            error: "Description must exist"
        })
    }

    if (!categoryId){
        return res.status(400).json({
            code: 400,
            error: "Category id must exist"
        })
    }

    if(!value){
        return res.status(400).json({
            code: 400,
            error: "Value must must exist"
        })
    }

    if(typeof value != 'number'){
        return res.status(400).json({
            code: 400,
            error: "Value must have a number value"
        })
    }

    db.AchievementsCategory.findOne({where:{id:categoryId}}).then((cat)=>{
        if(!cat){
            return res.status(404).json({
                code: 404,
                error: "Category wasn't found"
            })
        }
        db.UserAchievements.create({name: name, description: description,category:categoryId, value: value}).then((result) => {
            res.status(201).json({
                code: 201,
                message: `User Achievement was created with id of ${result.id}`,
                achievement: result.dataValues
            })
        })
        
    })
})

router.get('/user', (req, res) => {
    db.UserAchievements.findAll().then((resul) => {
        if(resul != undefined || resul != null || resul.length > 0 ){
            res.status(200).json({
                code: 200,
                achievement: resul
            })
        } else {
            res.status(404).json({
                code: 404,
                message: "Achievements weren't found"
            })
        }
    })
})

router.get('/user/:id', (req, res) => {
    db.UserAchievements.findOne({where:{id:req.params.id}}).then((resul) => {
        if(resul != undefined || resul != null){
            res.status(200).json({
                code: 200,
                achievement: resul.dataValues
            })
        } else {
            res.status(404).json({
                code: 404,
                message: "Achievement wasn't found"
            })
        }
    })
})

router.post('/group', (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const category = req.body.category
    const cost = req.body.cost
    const value = req.body.value

    if(!name){
        return res.status(400).json({
            code: 400,
            error: "Name must exist"
        })
    }

    if(!description){
        return res.status(400).json({
            code: 400,
            error: "Description must exist"
        })
    }

    if(!category){
        return res.status(400).json({
            code: 400,
            error: "Category must exist"
        })
    }

    if(!cost){
        return res.status(400).json({
            code: 400,
            error: "Cost must exist"
        })
    }

    if(typeof cost != 'number'){
        return res.status(400).json({
            code: 400,
            error: "Cost must have a number value"
        })
    }

    if(!value){
        return res.status(400).json({
            code: 400,
            error: "Value must must exist"
        })
    }

    if(typeof value != 'number'){
        return res.status(400).json({
            code: 400,
            error: "Value must have a number value"
        })
    }

    db.AchievementsCategory.findOne({where:{id:category}}).then((cat)=>{
        if(!cat){
            return res.status(404).json({
                code: 404,
                error: "Category wasn't found"
            })
        }
        
        db.GroupAchievements.create({name: name, description: description, category: category, cost: cost, value: value}).then((result) => {
            res.status(201).json({
                code: 201,
                message: `Group Achievement was successfully created with id of ${result.dataValues.id}`
            })
        })
    })
})

router.get('/group/all', (req, res) => {
    db.GroupAchievements.findAll().then((result) => {
        if(result){
            res.status(200).json({
                code: 200,
                message: result
            })
        } else {
            res.status(404).json({
                code: 404,
                error: "No group achievements were found"
            })
        }
    })
})

router.get('/group/:id', (req, res) => {
    const id = req.params.id
    db.GroupAchievements.findOne({where:{id:id}}).then((result) => {
        if(result){
            res.status(200).json({
                code: 200,
                message: result
            })
        } else {
            res.status(404).json({
                code: 404,
                error: "Group achievement wasn't found"
            }) 
        }
    })
}) 

router.post('/category/', (req, res) => {
    const name = req.body.name
    if(!name || name == null){
        return res.status(400).json({
            code:400,
            error:"Name is required"
        })
    }
    db.AchievementsCategory.create({name: name}).then((result) => {
        return res.status(201).json({
            code: 201,
            message: result.dataValues.id
        })
    })
})

router.get('/category/user/:id', (req, res) => {
    const id = req.params.id
    db.UserAchievements.findAll({where: {category: id}}).then((result) => {
        if (!result || result.length < 1){
            return res.status(404).json({
                code: 404,
                error: "Category wasn't found"
            })
        }

        return res.status(200).json({
            code: 200,
            message: result
        })
    })
})

router.get('/category/group/:id', (req, res) => {
    const id = req.params.id
    db.GroupAchievements.findAll({where: {category: id}}).then((result) => {
        if (!result || result.length < 1){
            return res.status(404).json({
                code: 404,
                error: "Category wasn't found"
            })
        }

        return res.status(200).json({
            code: 200,
            message: result
        })
    })
})


// db.User.findOne({where:{steamID:user.steamid}}).then((userDB)=>{
//     if (!userDB){
//       res.json({
//           code: 404,
//           message: "User not found"
//       })
//     }
//   })

module.exports = router

const express = require('express')

const routerUser = require("./routes/user.js")
const routerGroup = require("./routes/group.js")
const routerAchievements = require("./routes/achievements.js")
const routerImage = require("./routes/image.js")

const port = 3001

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user', routerUser)
app.use('/group', routerGroup)
app.use('/achievements', routerAchievements)
app.use('/image', routerImage)

app.listen(port, () => {
    console.log('listening on port')
})
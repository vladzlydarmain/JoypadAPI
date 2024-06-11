const {DataTypes, Sequelize} = require('sequelize')

const sequelize = new Sequelize('postgres://postgres:1324@localhost:5432/joypad', {
    dialect: "postgres",
})
const Group = sequelize.define("Group",{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true,
        primaryKey: true,
        autoIncrement: true
    },
    name: { 
        type: DataTypes.STRING, 
        allowNull: false,
        unique: false
    },
    description: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    admin_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false
    },
    category: {
        type: DataTypes.INTEGER
    },
    code:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

const Messages = sequelize.define("Messages", {
    id: {
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true,
        primaryKey: true,
        autoIncrement: true
    },
    value: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: false
    },
    steamid: {
        type: DataTypes.BIGINT, 
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    groupid: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

const GroupAchievements = sequelize.define("GroupAchievements", {
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    category:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:false
    },
    cost:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:false
    }
})

const GroupCategory = sequelize.define("GroupCategory", {
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    } 
})

const User = sequelize.define("User", {
    steamID: {
        type:DataTypes.BIGINT,
        allowNull:false,
        unique:true,
        primaryKey: true,
        autoIncrement:false
    },
    token:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    avatar:{
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    }, 
    code:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    }
})

const UserAchievements = sequelize.define("UserAchievements", {
    id: {
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    category:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:false
    }
})

const Category = sequelize.define("Category", {
    id: {
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

const AchievementsCategory = sequelize.define('AchievementsCategory',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:false
    }
})

const UsersGroup = sequelize.define('UsersGroup', {
    GroupId: {
        type: DataTypes.BIGINT,
        references: {
            model: Group,
            key: "id"
        },
    },
    UserSteamID: {
        type: DataTypes.BIGINT,
        references: {
            model: User,
            key: "steamID"
        }
    }
})

const AchievementsUser = sequelize.define('AchievementsUser')
const AchievementsGroup = sequelize.define('AchievementsGroup')

User.belongsToMany(UserAchievements, {through:  AchievementsUser}) 
UserAchievements.belongsToMany(User, {through:  AchievementsUser})
Group.belongsToMany(GroupAchievements, {through:  AchievementsGroup})
GroupAchievements.belongsToMany(Group, {through:  AchievementsGroup})
Group.belongsToMany(User, {through:  UsersGroup})
User.belongsToMany(Group, {through: UsersGroup})

sequelize.authenticate()
sequelize.sync() 

module.exports = {
    Group: Group, 
    Messages: Messages,
    GroupAchievements: GroupAchievements,
    GroupCategory: GroupCategory,
    User: User,
    UserAchievements: UserAchievements,
    Category: Category,
    UsersGroup:UsersGroup,
    AchievementsCategory:AchievementsCategory,
    AchievementsUser:AchievementsUser,
    AchievementsGroup:AchievementsGroup
}



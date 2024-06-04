const {DataTypes, Sequelize} = require('sequelize')
const express = require('express')

const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/joypad', {
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
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
    },
    users: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        unique: false
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false
    },
    achievements: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
        unique: false
    },
    category: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false
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
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    steamID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    groupID: {
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
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true,
        primaryKey: true,
        autoIncrement: true
    },
    groups: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
        unique: false
    }
})

const UserStats = sequelize.define("UserStats", {
    id: {
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true,
        primaryKey: true,
        autoIncrement: true
    },
    playtime: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false
    },
    achievements: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
        unique: false
    },
    steamID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
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
    }
})

sequelize.authenticate()
sequelize.sync()
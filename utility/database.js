const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-app1','root','test123',{
    dialect:'mysql',
    host:'localhost'
})

module.exports = sequelize
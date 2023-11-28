const Sequelize = require('sequelize')
const sequelize = require('../utility/database')


const Slider = sequelize.define('slider',{
    id:{
      type:Sequelize.INTEGER,
      autoIncrement:true,
      allowNull:false,
      primaryKey:true
    },
    sira:{
      type:Sequelize.INTEGER,
    },
    baslik:Sequelize.STRING,
    description :{
      type:Sequelize.STRING,
      allowNull:false,
    },
    url:Sequelize.STRING,
    img:Sequelize.STRING,
  })
   
  
   
  module.exports = Slider
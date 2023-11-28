const Sequelize = require('sequelize')
const sequelize = require('../utility/database')
 
const Product = sequelize.define('product',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  name:Sequelize.STRING,
  price: {
    type:Sequelize.INTEGER,
    allowNull:false

  },
  imageUrl :{
    type:Sequelize.STRING,
    allowNull:true
  },
  description :{
    type:Sequelize.STRING,
    allowNull:false,
  }
})
 

 
module.exports = Product
 
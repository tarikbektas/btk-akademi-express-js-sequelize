const express = require('express');
const app = express();
const router = express.Router();
const adminRoutes = require('./routes/admin');
const userRoutes  = require('./routes/user');
const connection = require('./utility/database')
const sequelize = require('./utility/database')
const bodyParser = require('body-parser')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cartitem')
const Category = require('./models/category')
const Product  = require('./models/product')
const Order  = require('./models/order')
const OrderItem  = require('./models//orderitem')
const path = require('path')




// user id'yi req içine atma işlemi
app.use((req,res,next)=>{
    User.findByPk(1)
    .then( user=>{
        req.user = user;
        next();
    }
        
    )
    .catch(err=>{console.log(err)})
})
 
app.use (bodyParser.urlencoded({extended:false}))
app.use('/', adminRoutes);
app.use('/', userRoutes);
app.set('view engine' ,'pug')
app.set('views','./views')
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
 
app.use((req,res)=>{
    res.render('404',{title:"sayfa bulunamadı"})
})




Product.belongsTo(Category,{
    foreignKey: {
        allowNull:false
    }
})

Category.hasMany(Product)

Product.belongsTo(User)
User.hasMany(Product)

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product,{ through: CartItem});
Product.belongsToMany(Cart,{through: CartItem})

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product,{through:OrderItem})
Product.belongsToMany(Order,{through:OrderItem})


let _user;
sequelize
.sync()
.then(() => {
    User.findByPk(1)
    .then(user=>{
        if(!user){
            User.create({
                name: 'Tarık Bektaş',
                email: 'admin@tarikbektas.com'
            })
            
        }
        return user;
    }).then(user=>{
        _user = user;
        return user.getCart();
    }).then(cart =>{
        if(!cart) {
            return _user.createCart();
        }
        return cart;
    }).then(()=>{
        Category.count()
        .then(count =>{
         if (count ===0){
             Category.bulkCreate([   
                 {name:'telefon', description:'telefon katagorisi'},
                 {name:'bilgisayar', description:'bilgisayar  katagorisi'},
                 {name:'elektronik', description:'elektronik katagorisi'}
         
             ])   
         }
        })
    })


 
    
}).catch((err) => {
    console.log('hata mesajı ',err)
});

app.listen(3000,()=>{
    console.log('http://localhost:3000 adresinde çalışıyor')
})
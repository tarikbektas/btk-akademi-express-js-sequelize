const Category = require('../models/category')
const Product = require('../models/product')
const Slider = require('../models/slider')
const User =require('../models/user')
exports.getproduct = (req,res)=>{
    Slider.findAll({order:[['id','ASC']]})
    .then(slider=>{
        var x = true
     
        Category.findAll().then(category=>{

            Product.findAll().then(product => {
                 
                res.render('index',{
                    title:'anasayfa',
                    product: product,
                    category:category,
                    slider:slider
                    
                })
              });
        })
    })
   

   
};


exports.getaddproducts =(req,res)=>{
    Category.findAll()
    .then(category=>{
        res.render('add-product',{title:"ürün ekleme sayfası",category:category})
    }).catch(err=>{console.log(err)})
   
 
   
}
exports.getaddcategory =(req,res)=>{
    Category.findAll()
    .then(category =>{
        res.render('add-category',{title:"katagori  ekleme sayfası",category:category})
    })
    .catch(err=>{console.log(err)})
    
   
}
 

exports.getEditProduct = (req,res,next)=>{
   
    Product.findByPk(req.params.productid)
    .then((product)=>{
        res.render('edit-product',{
        title:'test',
        product:product})
    })
    .catch((err)=>{
        console.log(err)
    }) 
    
    
}
// exports.getEditProduct = (req,res,next)=>{
   
//     Product.findAllk({where : {id:req.params.productid}})
//     .then((product)=>{
//         res.render('edit-product',{
//         title:'test',
//         product:product})
//     })
//     .catch((err)=>{
//         console.log(err)
//     }) 
    
    
// }

exports.postEditProduct = (req,res,next)=>{
 const name = req.body.name;
 const price = req.body.price;
 const description = req.body.desc;
 const id = req.body.id
 
 Product.findByPk(id)
 .then(product=>{
    product.name = name;
    product.price = price;
    product.description = description;
    product.save().then().catch(err=>{console.log(err)})
    res.redirect('/')
 })
 .catch(err=>{console.log(err)})
}

exports.postaddproducts =(req,res,next)=>{
  
    const price = req.body.price
    const name = req.body.name;
    const description = req.body.desc;
    const categoryid= req.body.categoryid ;
    const user = req.user;
    user.createProduct({
        name:name,
        price:price,
        description:description,
        categoryId : categoryid
    })
    .then((result=>{
        console.log(result);
        res.redirect('/')
        
    }))
    .catch((err)=>{console.log})
     
   
 }


 exports.postaddcategory =(req,res,next)=>{
    const category = new Category();

    const name = req.body.name;
    const description = req.body.desc;
    
    Category.create({
        name:name,

        description:description 
    })
    .then((result=>{
        console.log(result);
        res.redirect('/add-category')
        
    }))
    .catch((err)=>{console.log})
     
   
 }


 

exports.productid = (req,res,next) =>{
 
    Product.findAll({where:{id:req.params.productid}})
    .then((product)=>{
        res.render('product-detials',{
        title:'Ürün Detay Sayfası',
        product:product})
    })
    .catch((err)=>{
        console.log(err)
    })
 
}

exports.urunlistesi = (req,res,next)=>{
    const categories =Category.getAll();
    res.render('urunlistesi',{title:"ürün listesi"})
}
exports.productlist =(req,res) =>{
    Product.findAll().then(products=>{
        res.render('urunlistesi',{title:"ürün listesi",products : products})
    }).catch((err)=>{
     console.log(err)
    }) 
    
    
}
exports.adminproducts = (req,res) =>{
    Product.findAll().then(products=>{
        res.render('adminproducts',{title:"ürün listesi",products : products})
    }).catch((err)=>{
     console.log(err)
    }) 
    
  
}

exports.postDeleteById = (req,res,next) =>{
const id = req.body.productid;
console.log(id)
Product.destroy({where:{id:id}})
.then(
    res.redirect('/admin/products')
)
.catch(err=>{console.log(err)})
}

exports.postdeletebycategory = (req,res,next) =>{
    const id = req.body.categorysid
    console.log('Gelen id ',id)
    Category.destroy({where:{id:id}})
    .then(res.redirect('/add-category'))
    .catch(err=>{console.log(err)})

   
}


exports.addslider =(req,res,next)=>{
    res.render('../views/admin/add-slider.pug')
}


// karttaki ürünleri gösterme
exports.Getcard = (req,res,next) =>{
    req.user 
    .getCart()
    .then(cart=>{
        return cart.getProducts()
        .then(products=>{
            res.render('cart',{
                title:'kart',
                products:products
            })
            console.log('products bilgisi',products)
        })
    })
  
}


// karta ürün ekleme
exports.Postcard = (req,res,next) =>{
    const productid = req.body.productid;
    let quantity = 1;
    let userCart ;
    req.user.getCart()
    .then(cart=>{
        userCart = cart;     
        return cart.getProducts({where:{id:productid}})

    })
    .then(products=>{
        let product
        if(products.length >0){
            product = products[0]
        }
        if(product){
            quantity += product.cartItem.quantity
            return product
        }
        return Product.findByPk(productid)
    })
    .then(product=>{
        userCart.addProduct(product,{
            through:{
                quantity:quantity
            }
        })
    })
    .then(()=>{
        res.redirect('/cart')
    })
    .catch(err=>{console.log(err)})
}

// kartdan ürün silme
exports.Deletecard = (req,res,next) =>{
    const productid = req.body.productid;

    req.user
    .getCart()
    .then(cart=>{
        return cart.getProducts({where:{id:productid}})
    }).then(products=>{
        const product = products[0];
        product.cartItem.destroy();
    }).then(result=>{
        res.redirect('/cart')
    })
}



exports.getOrder=(req,res,next) =>{
    req.user
    .getOrders({include : ['products']})
    .then(orders=>{
        
        console.log(orders)
        res.render('order',{
            title:'sipariş',
            orders:orders
        })
    })



  
}


exports.postOrder = (req,res,next) =>{
    let userCart ;
    req.user
    .getCart()
    .then(cart=>{
        userCart = cart;
        return cart.getProducts();
    })
    .then(products=>{
        
        return req.user.createOrder()
        .then(order=>{
            order.addProducts(products.map(product=>{
                product.orderItem ={
                    quantity:product.cartItem.quantity,
                    price:product.price
                }
                return product
            }))
        })
    })
    .then(()=>{
        userCart.setProducts(null);
    })
    .then(()=>{
        res.redirect('/')
    })
    .catch(err=>{console.log(err)})





  
}
const express = require('express');
const router = express.Router();
const shopcontroller = require('../controllers/product')
const slidercontroller = require('../controllers/slider')



router.get('/add-product',shopcontroller.getaddproducts) 
router.post('/add-product',shopcontroller.postaddproducts)

 

router.get('/products',shopcontroller.productlist)
router.get('/products/:productid',shopcontroller.productid)
router.get('/edit-product/:productid',shopcontroller.getEditProduct)
router.post('/edit-product/edit-product',shopcontroller.postEditProduct)
router.post('/admin/products',shopcontroller.postDeleteById);



router.get('/add-category',shopcontroller.getaddcategory) 
router.post('/add-category',shopcontroller.postaddcategory)
router.post('/add-categorydelete',shopcontroller.postdeletebycategory);
 


router.get('/admin/products',shopcontroller.adminproducts)

router.get('/add-slider',slidercontroller.addslider)
router.get('/edit-slider/:sliderid',slidercontroller.geteditslider)
router.post('/edit-slider/post-edit-slider',slidercontroller.posteditslider)
router.post('/add-slider',slidercontroller.postaddslider)
router.post('/edit-sliderdelete',slidercontroller.postdeleteslider)

router.get('/cart',shopcontroller.Getcard);
 
router.post('/cart',shopcontroller.Postcard);
router.post('/delete-card',shopcontroller.Deletecard)

router.get('/order',shopcontroller.getOrder)
router.post('/create-order',shopcontroller.postOrder)
 
module.exports  = router;
 
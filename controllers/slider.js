const Category = require('../models/category')
const Product = require('../models/product')
const Slider = require('../models/slider')
 
// slider kontrol sayfasını gösteren controller
exports.addslider =(req,res,next)=>{

    Slider.findAll()
    .then(slider=>{
        res.render('../views/admin/add-slider.pug',{title:'slider ekle',slider:slider})
    })
    
}


exports.postaddslider = (req,res,next) =>{
    const baslik = req.body.baslik;
    const description = req.body.description;
    const url = req.body.url;
    const img = req.body.img
    const sira = req.body.sira
    Slider.create({
        baslik:baslik,
        description:description,
        url:url,
        img:img,
        sira:sira
    })
    .then((result=>{
        console.log(result);
        res.redirect('/add-slider')
        
    }))
    .catch((err)=>{console.log})
     
}
exports.geteditslider =(req,res) =>{

    Slider.findByPk(req.params.sliderid)
    .then((slider)=>{
        res.render('edit-slider',{
        title:'slider düzenle',
        slider:slider})
    })
    .catch((err)=>{
        console.log(err)
    }) 


}

exports.posteditslider =(req,res,next) =>{
 const baslik = "test";
 const description = req.body.description;
 const url = req.body.url;
 const img = req.body.img;
 const id = req.body.id;
 Slider.findByPk(id)
 .then(slider=>{
    slider.baslik = baslik;
    slider.description =description;
    slider.url = url;
    slider.img = img,
    slider.save().then(res.redirect('/add-slider')).catch(err=>{console.log(err)})

 })
 .catch(err=>{console.log(err)})
}


exports.postdeleteslider=(req,res,next) =>{

    const id = req.body.sliderid
    Slider.findByPk(id)
    .then(slider=>{
        slider.destroy();
        res.redirect('/add-slider')
    })
    
}
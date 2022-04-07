const express=require('express');
const bodyParse=require('body-parser');
const mysql=require('mysql');
require('dotenv').config();
const app=express();
const port=process.env.PORT||5000;
const exphbs=require('express-handlebars');
app.use(bodyParse.urlencoded({extended: false}));
app.use(bodyParse.json());
app.use(express.static('public'));
app.engine('html',exphbs.engine({
    extname:'.html',
    defaultLayout: false


}));
app.set('view engine','html');
app.get('',(req,res)=>{
    res.render('index');

});





app.listen(port,()=> console.log('server started succesfulluy on port',port));


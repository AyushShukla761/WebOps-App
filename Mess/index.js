const express =require('express')
const mess =require('./mess.json')
const ejs=require('ejs')
const path= require('path')
const ejsMate = require('ejs-mate')
const methodOverride= require('method-override')

const app= express()

app.set('view engine', "ejs")
app.set('views',path.join(__dirname,'views'))
app.engine('ejs',ejsMate)

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.get('/',(req,res)=>{
    res.redirect('/menu')
})
app.get('/menu',(req,res)=>{
    res.render('mess/menu')
})

app.get('/menu/:region/:week/:day',(req,res)=>{
    const {region,week,day}= req.params;
    res.render('mess/show',{mess,region,week,day})
})

app.post('/show',(req,res)=>{
    const {region,week,day}= req.body;
    res.redirect(`/menu/${region}/${week}/${day}`)
    
})


app.listen(2000,()=>{
    
        console.log("Listening...");
    
})
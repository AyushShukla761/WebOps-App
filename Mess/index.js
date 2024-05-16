const express =require('express')
const mess =require('./mess.json')
// const ejs=require('ejs')
// const path= require('path')
// const ejsMate = require('ejs-mate')
const methodOverride= require('method-override')

const app= express()

// app.set('view engine', "ejs")
// app.set('views',path.join(__dirname,'views'))
// app.engine('ejs',ejsMate)

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

// app.get('/',(req,res)=>{
//     res.redirect('/menu')
// })
// app.get('/menu',(req,res)=>{
//     res.render('mess/menu')
// })

app.get('/',(req,res)=>{
    const {region,week,day}= req.body;
    console.log(req.body)
    if(region && week && day){                                // YOU SHOULD USE QUERY WITH KEY region, week, day ONLY.
                                                              // VALUES FOR THE KEY SHOUD BE SAME AS IN mess.json FILE.
        res.json(mess[region][week][day])        //   EX:- http://localhost:2000/?region=North Veg&week=odd&day=Wednesday
    }
    else if(week && !day){                                    //   YOU WILL HAVE TO USE POSTMAN TO SEND DATA TO req.body.
        res.json(mess[region][week])
    }
    else{
        res.json(mess[region])
    }
})

// app.post('/show',(req,res)=>{
//     const {region,week,day}= req.body;
//     res.redirect(`/menu/${region}/${week}/${day}`)
    
// })


app.listen(2000,()=>{
    
        console.log("Listening...");
    
})
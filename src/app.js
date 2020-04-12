const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define path for express
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Set handlebar
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//set static directory
app.use(express.static(publicDirPath))
//app.com
//app.com/help

//app.com/about
app.get('',(req,res)=>{
    res.render('index',{
        title: "Weather",
        name: 'Lev Rakhman'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        message: 'This is help',
        name: 'Lev Rakhman'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        message: 'This is help',
        title: 'Help',
        name: 'Lev Rakhman'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        res.send({
            error: "You must provide an address"
        })
        return;
    }
    const address = req.query.address
    geocode(address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forcastData) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                location: location,
                address: address,
                forecastDate: forcastData
            })
        })    
    })    
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        res.send({
            error: "You must provide a search"
        })
        return;
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})
//req request, resp response
app.get('/help/*',(req,res)=>{
    res.render('error',{
        errorMessage: 'Help article not found',
        title: '404',
        name: 'Lev Rakhman'
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        errorMessage: 'Page not found',
        title: '404',
        name: 'Lev Rakhman'
    })
})

app.listen(port, ()=>{
    console.log('server is up on port ' + port)
})


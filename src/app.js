const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")


const app = express()
const port = process.env.PORT || 3000

//Define PATHS for express config
const pathDirectoryPath = path.join(__dirname, "../public")
const viewspPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

//Setup HANDLEBARS engine and views location
app.set("view engine", "hbs")
app.set("views", viewspPath)
hbs.registerPartials(partialsPath)

//Setup STATIC directory to serve
app.use(express.static(pathDirectoryPath))

app.get("", (req, res) => {
    res.render("index", {
        TITLE: "WEATHER",
        NAME: "BHARAGAVA"
    })
})

app.get("/about", (req, res) =>{
    res.render("about", {
        TITLE: "ABOUT PAGE",
        NAME: "BHARGAVA"
    })
})

app.get("/help", (req, res) =>{
    res.render("help", {
        MESSAGE: "THIS IS A HELP OF THIS WEBSITE",
        TITLE:"HELP PAGE",
        NAME: "BHARGAVA"
        
    })
})

app.get("/products", (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "YOU MUST PROVIDE SEARCH TERM"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address){
        return res.send({
            ERROR: "MUST ENTER THE ADDRESS"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send(error)
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send(error)
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        TITLE: "404 error",
        NAME: "BHARGAVA",
        errorMessage: "HELP ARTICLE NOT FOUND"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        TITLE: "404 error",
        NAME: "BHARGAVA",
        errorMessage: "404 page not found"
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})
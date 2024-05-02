//this is a script is essentially a mini-app that can be injected into our main app.
const express = require('express')
const router = express.Router()//a router works the same as an app, with similar funtions like ".get" and ".post". 

router
.get("/", (req, res) =>{
    console.log(req.query.name)//we can query information without using an index
    res.send("User List")
})

router.get("/new",(req,res) =>{
    res.render("users/new", {firstName: "Enter Name"}) 
})

router.post("/",(req,res) => {
    const isValid = true//false//we can test our inputs from the user with a bool so we dont have to fully flesh out all functionality to test
    if (isValid){
        users.push({firstName: req.body.firstName})//this will push a new element into our array of users
        res.redirect(`/users/${users.length - 1}`)
    }else{
        console.log("Error")
        res.render('users/new',{firstName: req.body.firstName})//if that 2nd parameter wasn't there, upon pressing submit: the user would see the input field wiped
        //that makes for a bad user experience because they can't see what waas wrong
    }
    console.log(req.body.firstName)
})


router
.route("/:id")//get, put, send, delte, etc. are all responces sent to the user.
.get((req, res) =>{//router.route is essentially syntactic sugar that lets you chain together routing requests
    console.log(req.user)
    res.send(`User Get User with ID ${req.params.id}`)// in order to pass in code in a message you need to use "`" to denote your sending the return of something.
    //"${}" is the syntax for passing in code inside a message
    // we can create a dynamic parameter in a url which can be done with ":". "id" is the varible that stands in for the code which determines the url and can be accessed with "." automatically
    //Always place routes with static id's above dynamic ones, otherwise you can end up with a routing error. Express read code from top to bottom and anything after
    // ":" counts as a valid string ID. SO "http://localhost:3000/users/new" would trigger this routes send request and also a route with a static route of "/new" below it.

}).put((req, res) =>{
    res.put(`Update user with ID ${req.params.id}`)//typically if you make a route, you'll also make a put route that allows you to update a user based on ID

}).delete((req,res) =>{
    res.send(`Delete User WITH ID ${req.params.id}`)
})

const users = [{name: "Kyle"}, {name: "Sally"}]
router.param("id", (req, res, next, id) =>{
    req.user = users[id]//<-- anytime we have an ID, get it from our user array
    next()//<--this will call the next function in line which is going to be the first responce in .route("/:id") since this code only triggers on params with "id"
})//runs any time it finds a parameter that matches the name you pass in
//In english this code says:
//Whenever you go to a route that has an "id" parameter i want you to run this code with a request, a responce, our next, and our id.
//param will not run any other code unless we call the "next" function, causing an infinite load on the browser.
//The way that the next funtion works is if you call this functionl, run the next funtion in line.
//This is all because ".param" is essentially a type of "middleware". Middleware in express is stuff that run between a request being sent to a server and a responce being returned
//to the user.
//This means that middleware is ran BEFORE a responce is given to a user.
//This also means that routing in general is middleware.
//middleware is one of the most important concepts of Express




module.exports = router
const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static("public"))//Express has bhuilt in middleware. the static middleware allows use to serve a static html file and its contents without nessissarily needing to route!
                                    //in the browser, the files are accessible via the same location path as in the editor eg: /test/tt.html
//app.use(logger)//logger if placed here would run for everything in our middleware
app.use(express.urlencoded({ extended: true}))//allows the parsing of info from the body of requests
app.use(express.json())//does the same thing as urlencoded but allows you to parse json info from the body of requests

//app.get('/', logger, (req, res) =>{// you can pass anything into parameters to be run. In this instance, if logger was only used here, logger would run only for this get request.
//    res.render("index", {text: 'World'})//the second paramter "{text: 'World'}" is passed into the client from the server
//})//Additionally, you can pass multiple functions into a request just by adding another argument element to the parameters: app.get('/', logger,logger,logger,etc.

//if app.use(logger) was moved here then the original url wont be printed because the above get request is defined before our logger function
//So if you want a function to be used on all of your routes, always define it at the top of the page.
//Alternatively, use them on individual end point for more precise execution
const userRouter = require('./routes/users')

app.use('/users', userRouter)//the first parameter is where the route is mounted, somewhat like assigning a path to a file in a directory.

function logger(req, res, next){
    console.log(req.originalUrl)
    next()
}

app.listen(3000)

//middleware runs from top to bottom


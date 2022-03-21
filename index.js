//import express in index.js
const express = require('express')

//import jsonwebtoken
const jwt = require('jsonwebtoken')


//index.js l registerne kitan  servicene import 

const dataService = require('./services/data.service')

//create an app using express

const app = express()


//to parse json using express


app.use(express.json())

//resolve http reqst from clientr

app.get('/', (req, res) => {

  res.send("its  get method")

  //  res.status(401).send("its  get method")
})

//to create data eg:regstr 

app.post('/', (req, res) => {
  res.send("its a post method")
})

//to update/modify data  
app.put('/', (req, res) => {
  res.send("its  put method")
})

//to update partially data
app.patch('/', (req, res) => {
  res.send("its a patch method")
})

//to delete data
app.delete('/', (req, res) => {
  res.send("its a delete method")
})



//application specific middleware

const appMiddleware = (req, res, next) => {
  console.log("application specific middleware")
  next()
}

app.use(appMiddleware)

//to verify token-middleware


const jwtMiddleware = (req, res, next) => {
  try {
   // const token = req.body.token   //requestn token edukum 
   const token = req.headers["x-access-token"] //headerl token kodukum

    //verify token

    const data = jwt.verify(token, 'supersecretkey')
    //login cheytha alde current acno data.current acno lnu kitum  arano withdrw or deposit polula request varna acno lek eduth vakm athum withdrw rqstle acnom same ankl mathram allow cheym
    req.currentAcno = data.currentAcno   //token generate cheytha tml ullla accno ne eduth requestnakathula currnt acnolek eduth vakunu
    next()
  }
  catch {
    res.status(422).json({
      statusCode: 422,
      status: false,
      message: "please log in"
    })
  }
}



//bank api

//register api

app.post('/register', (req, res) => {

  const result = dataService.register(req.body.acno, req.body.uname, req.body.password)
  res.status(result.statusCode).json(result)

  //         if (result)
  //         {
  // res.send("registered successfully")
  //         }
  //         else{
  //             res.send("already registered.....please log in")

  //         }

  //mukalil define cheyth data service vach call cheyanm

  //client ln varuna reqst athinte body l kodukukaa

})
//login api

app.post('/login', (req, res) => {

  const result = dataService.login(req.body.acno, req.body.password)
  res.status(result.statusCode).json(result)
})

//deposit
//router specific
app.post('/deposit', jwtMiddleware,(req, res) => {

  const result = dataService.deposit(req.body.acno, req.body.password, req.body.amt)
  res.status(result.statusCode).json(result)
})

//withdraw

app.post('/withdraw',jwtMiddleware, (req, res) => {

  const result = dataService.withdraw(req,req.body.acno, req.body.password, req.body.amt)
  res.status(result.statusCode).json(result)
})

app.post('/transaction',jwtMiddleware, (req, res) => {

  const result = dataService.getTransaction(req.body.acno)
  res.status(result.statusCode).json(result)
})





//set up port number

app.listen(3000, () => {
  console.log("server started at port no:3000");
})
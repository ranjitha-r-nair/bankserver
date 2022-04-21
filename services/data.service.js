// client sidele service fldrne pole serverlm create akunu clientln varuna reqst solve cheyan database kodukan
//regstr  reqst varumbo  aa fun ns define cheyan
const jwt = require('jsonwebtoken')

//import user model 

const db = require('./db')

database = {
  1000: { acno: 1000, uname: "Neer", password: 1000, balance: 5000, transaction: [] },
  1001: { acno: 1001, uname: "Vyom", password: 1001, balance: 5000, transaction: [] },
  1002: { acno: 1002, uname: "Laisha", password: 1002, balance: 5000, transaction: [] }
}

//register definition

//js l functions arrow fun n ayi kodukuka

const register = (acno, uname, password) => {

  return db.User.findOne({ acno })//key and value same ankl ingana koduthal mathi
//asynchronous
    .then(User => {
      if(User){
      return {
        statusCode: 422,
        status: false,
        message: "user already exist ....please login"
      }
    }
    else{
      const newUser =new db.User({
              acno,
              uname,
              password,
              balance: 0,
              transaction: []
      })
      newUser.save()
      return {
              statusCode: 200,
              status: true,
        
                 message: "successfully registered"
      }
    }
    })
  
  
}


  //   if (acno in database) {
  //     return {
  //       statusCode: 422,
  //       status: false,
  //       message: "user already exist ....please login"
  //     }
  //   }
  //   else {
  //     database[acno] = {
  //       acno,
  //       uname,
  //       password,
  //       balance: 0,
  //       transaction: []
  //     }
  //     console.log(database)

  //     return {
  //       statusCode: 200,
  //       status: true,
  //       message: "successfully registered"

  //     }
  //   }
  // }
  //data servicel ulla eth file ne ano index.js n vende aa methodne export cheyuka




  //login
  const login = (acno, password) => {

    return db.User.findOne({ acno,password })//key and value same ankl ingana koduthal mathi
    //asynchronous
        .then(user => {
          if(user){
            
              currentAcno = acno
          currentUname = user.uname
  
          
      // if (acno in database) {
      //   if (password == database[acno]["password"]) {
  
      //     currentAcno = acno
  
      //     currentUname = database[acno]["uname"]
      //     //login cheyumbo ulla current usermte acno m uname m eduthu
  
          //token generation
  
          const token = jwt.sign({
            currentAcno: acno  
              //current acnolek token store cheyan
          },
            'supersecretkey'  //string ayitula oru secret key generete cheyuka
          )
  
          return {
            statusCode: 200,
            status: true,
            message: "successfully login",
            currentAcno,
            currentUname,
            token  //clientlek token koode send cheythu kodukum
          }
  
  
        }
        else {
          return {
            statusCode: 422,
            status: false,
            message: "incorrect password/Account number"
          }
  
        }
          })
        }
  
  //   else {

  //     return {
  //       statusCode: 422,
  //       status: false,
  //       message: "user not exist"
  //     }
    
  //   }
  // }

  //deposit 

  const deposit = (acno, password, amt) => {

    var amount = parseInt(amt)
//asynchronous

return db.User.findOne({acno,password})
.then(user=>{

  if(user){

  user.balance += amount 
  user.transaction.push({
    amount: amount,
    type: "credit"
  })
  user.save()//dblek save avan vndit 
  return {
    // return database[acno]["balance"]
    statusCode: 200,
    status: true,
    message: amount + "successfully deposited...and new balance is" + user.balance

  }
  

  }
  else {
    // alert("incorrct password")
    return {
      statusCode: 422,
      status: false,
      message: "incorrct password/account number"

    }
  }

})

  }
  //   if (acno in database) {
  //     if (password == database[acno]["password"]) {
  //       database[acno]["balance"] += amount

  //       database[acno]["transaction"].push({
  //         amount: amount,
  //         type: "credit"
  //       })

  //       return {
  //         // return database[acno]["balance"]
  //         statusCode: 200,
  //         status: true,
  //         message: amount + "successfully deposited...and new balance is" + database[acno]["balance"]

  //       }

  //     }

  //     else {
  //       // alert("incorrct password")
  //       return {
  //         statusCode: 422,
  //         status: false,
  //         message: "incorrct password"

  //       }
  //     }
  //   }
  //   else {
  //     //alert("user not exist")
  //     return {

  //       statusCode: 422,
  //       status: false,
  //       message: "user not exist"



  //     }
  //   }
  // }




  //withdraw 


  
  const withdraw = (req, acno, password, amt) => {

    var amount = parseInt(amt)

    var currentAcno = req.currentAcno // login cheythal thanano withdrw cheyune nokan reqstle cuurent acno ne  loginle cuurnt acnolek koduthu //current login cyeythal thannano widrw rqstcheythe nokan

    //asynchronous

return db.User.findOne({acno,password})
.then(user=>{
  

if(user){
  if(currentAcno !=acno){
  
    return {
      statusCode: 422,
      status: false,
      message: "operation denied"

    }

  }
 
  if (user.balance > amount) {
    user.balance -= amount
    user.transaction.push({
      amount: amount,
      type: "Debit"
    })
user.save()
    return {
      
      statusCode: 200,
      status: true,
      message: amount + "successfully debited...and new balance is" + user.balance

    }
  }
  else {

    return {
      statusCode: 422,
      status: false,
      message: "insufficient balance"

    }

  }

}
      else {
        
        return {
          statusCode: 422,
          status: false,
          message: "incorrct password//Account number"

        }

      }
      

  })
  }

  //   if (acno in database) {
  //     if (password == database[acno]["password"]) {
  //       if (currentAcno == acno) {//login cheythatha acno ano withdrw cheyune check akm alkl operation denied avm

  //         if (database[acno]["balance"] > amount) {
  //           database[acno]["balance"] -= amount
  //           database[acno]["transaction"].push({
  //             amount: amount,
  //             type: "Debit"
  //           })

  //           return {
  //             // return database[acno]["balance"]
  //             statusCode: 200,
  //             status: true,
  //             message: amount + "successfully debited...and new balance is" + database[acno]["balance"]

  //           }




  //         }
  //         else {
  //           //alert("insufficient balance")
  //           return {
  //             statusCode: 422,
  //             status: false,
  //             message: "insufficient balance"

  //           }

  //         }


  //       }
  //       else {
  //         return {
  //           statusCode: 422,
  //           status: false,
  //           message: "operation denied"

  //         }

  //       }
  //     }
  //     else {
  //       //alert("incorrct password")
  //       return {
  //         statusCode: 422,
  //         status: false,
  //         message: "incorrct password"

  //       }

  //     }
  //   }
  //   else {
  //     //alert("user not exist")
  //     return {
  //       statusCode: 422,
  //       status: false,
  //       message: "user not exist"

  //     }

  //   }
  // }


  //transaction

  const getTransaction = (acno) => {

    //asynchronous

    return db.User.findOne({acno})
    .then(user=>{
      if(user){

        return {
          statusCode: 200,
          status: true,
          transaction: user.transaction
  
        }
  
      }
      else {
        return {
          statusCode: 422,
          status: false,
          message: "user not exist"
  
        }
  
      }
      })
    }
  
  //   if (acno in database) {

  //     return {
  //       statusCode: 200,
  //       status: true,
  //       transaction: User.transaction

  //     }

  //   }
  //   else {
  //     return {
  //       statusCode: 422,
  //       status: false,
  //       message: "user not exist"

  //     }

  //   }
  // }

//delete Api

const deleteAcc=(acno)=>{
  return db.User.deleteOne({acno})
  .then(user=>{
    if(user){

      return {
        statusCode: 200,
        status: true,
        message:"the requested account  number "+acno+ "deleted successfully"
      }
 
  }
  return {
    statusCode: 422,
    status: false,
    message: "operation failed"
  }
    }
  )
}
  //modules import akuka functionte vere filesl refer cheynkl import chrynm iviide

  module.exports = {
    register,
    login,
    deposit,
    withdraw,
    getTransaction,
    deleteAcc
  }


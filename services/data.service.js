// client sidele service fldrne pole serverlm create akunu clientln varuna reqst solve cheyan database kodukan
//regstr  reqst varumbo  aa fun ns define cheyan

database = {
  1000: { acno: 1000, uname: "Neer", password: 1000, balance: 5000, transaction: [] },
  1001: { acno: 1001, uname: "Vyom", password: 1001, balance: 5000, transaction: [] },
  1002: { acno: 1002, uname: "Laisha", password: 1002, balance: 5000, transaction: [] }
}

//register definition

//js l functions arrow fun n ayi kodukuka

const register = (acno, uname, password) => {


  if (acno in database) {
    return {
      statusCode: 422,
      status: false,
      message: "user already exist ....please login"
    }
  }
  else {
    database[acno] = {
      acno,
      uname,
      password,
      balance: 0,
      transaction: []
    }
    console.log(database)

    return {
      statusCode: 200,
      status: true,
      message: "successfully registered"

    }
  }
}
//data servicel ulla eth file ne ano index.js n vende aa methodne export cheyuka




//login
const login = (acno, password) => {


  if (acno in database) {
    if (password == database[acno]["password"]) {

      currentAcno = acno

      currentUname = database[acno]["uname"]
      //login cheyumbo ulla current usermte acno m uname m eduthu


      return {
        statusCode: 200,
        status: true,
        message: "successfully login",
        currentAcno,
        currentUname
      }


    }
    else {
      return {
        statusCode: 422,
        status: false,
        message: "incorrect password"
      }

    }
  }
  else {

    return {
      statusCode: 422,
      status: false,
      message: "user not exist"
    }

  }
}

//deposit 

const deposit = (acno, password, amt) => {

  var amount = parseInt(amt)




  if (acno in database) {
    if (password == database[acno]["password"]) {
      database[acno]["balance"] += amount

      database[acno]["transaction"].push({
        amount: amount,
        type: "credit"
      })
      
      return {
        // return database[acno]["balance"]
        statusCode: 200,
        status: true,
        message: amount + "successfully deposited...and new balance is" + database[acno]["balance"]

      }
    
  }

    else {
      // alert("incorrct password")
      return {
        statusCode: 422,
        status: false,
        message: "incorrct password"

      }
    }
  }
  else {
    //alert("user not exist")
    return {

      statusCode: 422,
      status: false,
      message: "user not exist"



    }
  }
}




//withdraw 

const withdraw=(acno,password,amt)=>
{

var amount=parseInt(amt)

  

if(acno in database)
{
  if(password == database[acno]["password"])
  {
    if(database[acno]["balance"]>amount)
    {
      database[acno]["balance"]-=amount
      database[acno]["transaction"].push({
        amount:amount,
        type:"Debit"
      })

      return {
        // return database[acno]["balance"]
        statusCode: 200,
        status: true,
        message: amount + "successfully debited...and new balance is" + database[acno]["balance"]

      }

      
      

    }
    else
    {
      //alert("insufficient balance")
      return {
        statusCode: 422,
        status: false,
        message: "insufficient balance"

      }

    }
  }
  else
  {
    //alert("incorrct password")
    return {
      statusCode: 422,
      status: false,
      message: "incorrct password"

    }

  }
 }
else {
  //alert("user not exist")
  return {
    statusCode: 422,
    status: false,
    message: "user not exist"

  }

}
}


//modules import akuka functionte

module.exports = {
  register, 
  login,
   deposit,
   withdraw
}


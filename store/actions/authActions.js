import AsyncStorage from '@react-native-async-storage/async-storage'
export const SIGN_UP='SIGN_UP'
export const LOG_IN='LOG_IN'
export const AUTH='AUTH'
export const LOG_OUT="LOG_OUT"
export const signUp=(email,password)=>{
 return async dispatch=>{
  const res= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCfQWCODzSTZFmRGr2fN23ji4Zbwrqr7vw',{
   method:'POST',
   headers:{
    'Content-Type':'application/json',
   },
   body:JSON.stringify({email:email,password:password,returnSecureToken:true})
  }) 
  if(!res.ok){
   let message
   const errData =await res.json()
   console.log(errData)
   const errid=errData.error.message
   if(errid==="EMAIL_EXISTS"){
    message="Email Exits, Please Sign Up With Another Email"
   }
   else if(errid==="OPERATION_NOT_ALLOWED"){
    message="Password sign-in is disabled for this project"
   }
   throw new Error(message)
  }
  const data= await res.json()
  dispatch({
   type:SIGN_UP,
   payload:{
   token:data.idToken,
   userId:data.localId
   }
  })
  const expireDate=new Date(new Date().getTime()+parseInt(data.expiresIn) * 1000)
     storedetails(data.idToken,data.localid,expireDate)
}

}
 export const logIn=(email,password)=>{
    return async dispatch=>{
      
     const res= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCfQWCODzSTZFmRGr2fN23ji4Zbwrqr7vw',{
      method:'POST',
      headers:{
       'Content-Type':'application/json',
      },
      body:JSON.stringify({email:email,password:password,returnSecureToken:true})
     }) 
     if(!res.ok){
      let message='SomeThing Went wrong'
      const errData =await res.json()
      console.log(errData)
      const errid=errData.error.message
      if(errid==="EMAIL_NOT_FOUND"){
       message="Email Not Found, Please Sign Up"
      }
      else if(errid==="INVALID_PASSWORD"){
       message="Password is invalid,Please enter valid password"
      }
      throw new Error(message)
     }
     const data= await res.json()
     dispatch({
      type:LOG_IN,
      payload:{
         token:data.idToken,
         userId:data.localId
         }
     })
     const expireDate=new Date(new Date().getTime()+parseInt(data.expiresIn) * 1000)
     storedetails(data.idToken,data.localId,expireDate)
    }
    } 
    const storedetails=(token,userId,expireDate)=>{
       AsyncStorage.setItem('user',JSON.stringify({
        token:token,
        userId:userId,
        expireDate:expireDate.toISOString()
      }))
    }
    export const authenticate=(token,userId)=>{
     return dispatch=>{
        dispatch({
          type:'AUTH',
          token:token,
          userId:userId
        })
     }
    }
    export const logOut=()=>{
       AsyncStorage.removeItem('user')
       return{
          type:LOG_OUT
       }
    }

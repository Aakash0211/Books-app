import Profiles from "../../models/Profiles"

export const SAVE_PROFILE='SAVE_PROFILE'
export const LOAD_PROFILE="LOAD_PROFILE"
export const saveProfile=(imageUri,name,number,bio)=>{
return async (dispatch,getState)=>{
 const userId=getState().auth.userId
 const res=await fetch(`https://books-app-2324f-default-rtdb.firebaseio.com/profile/${userId}.json`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
        userId:userId,
        imageUri:imageUri,
        name:name,
        number:number,
        bio:bio
    })
  })
  if(!res.ok){
    throw new Error("SomeThing Went Wrong")
  }
 dispatch({
     type:SAVE_PROFILE,
     payload:{
        userId:userId,
        imageUri:imageUri,
        name:name,
        number:number,
        bio:bio
     }
 })
}
}
export const loadProfile=()=>{
    return async (dispatch,getState)=>{
      const userId=getState().auth.userId
      const res=await fetch(`https://books-app-2324f-default-rtdb.firebaseio.com/profile/${userId}.json`)
      if(!res.ok){
        throw new Error("SomeThing Went Wrong")
      }
      const data=await res.json()
      const profile=[]
      for (const key in data){
        profile.push(
          new Profiles(
            data[key].userId,
            data[key].imageUri,
            data[key].name,
            data[key].number,
            data[key].bio,
          )
        )
      }
      dispatch({
        type:LOAD_PROFILE,
        payload:Object.assign({},profile)
      })
    }
  }


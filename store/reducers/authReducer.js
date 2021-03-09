import { LOG_IN, SIGN_UP,AUTH,  LOG_OUT } from "../actions/authActions"

const initialState={
 token:null,
 userId:null
}
export default(state=initialState,action)=>{
   switch(action.type){
     case SIGN_UP:{
         return {
             token:action.payload.token,
             userId:action.payload.userId
         }
     }
     case LOG_IN:{
         return{
            token:action.payload.token,
            userId:action.payload.userId
         }
     }
     case AUTH:{
        return{
            token:action.token,
            userId:action.userId
         }
     }
     case LOG_OUT:{
         return initialState
     }
     default:{
         return state
     }

   }
}
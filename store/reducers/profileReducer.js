import { LOAD_PROFILE, SAVE_PROFILE } from "../actions/profileActions"
import Profiles from '../../models/Profiles.js'
const initialState={
 profile:{}
}
export default (state=initialState,action)=>{
 switch(action.type){
     case SAVE_PROFILE:{
         const newProfile= new Profiles(action.payload.userId,action.payload.imageUri,action.payload.name,action.payload.number,action.payload.bio)
         return{
             ...state,
             profile:newProfile
         }
     }
     case LOAD_PROFILE:{
         return{
             ...state,
             profile:action.payload
         }
     }
     default:
        return state
 }
}
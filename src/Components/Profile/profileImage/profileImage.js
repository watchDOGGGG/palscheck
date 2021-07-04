import React,{useState,useEffect} from 'react'
import '../profile.css'

const ProfileImage = ({coverImg})=>{

    return(
      
        <div class="profile-image">
        <div class="ratio-1by1"><img src={coverImg} /></div>
    </div>
    )
}
export default ProfileImage
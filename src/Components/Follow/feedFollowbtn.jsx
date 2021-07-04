import React, { useState,useEffect } from 'react'
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';

const SeverLink = 'http://localhost:4000'
const Followbtn =({userid,followtype,name})=>{
    
    const [btnroute,setbtnroute] = useState(0)

    useEffect(()=>{
       try {
        CheckFollowing()
       } catch (error) {
           
       }
    })
    
    //checkIFUsers are following
    const CheckFollowing = async()=>{
        const Start = await fetch(`${SeverLink}/Authentication/checkfollow/${userid}`,{
            headers:{token:localStorage.token}
        })
        const response = await Start.json()
        if(response.following){
            setbtnroute(1)
        }else{
            setbtnroute(0)
        }

    }
    //startFollowwing
    const startFollowing = async()=>{
        const Start = await fetch(`${SeverLink}/Authentication/follow/${userid}`,{
            method:'POST',
            headers:{'Content-Type':'application/json',token:localStorage.token},
            body: JSON.stringify({
                type:followtype
            })
        })
        const response = await Start.json()
        if(response.follow){
            setbtnroute(1)
        }else{
            setbtnroute(0)
        }

    }
    return (
        <div>
            {
                btnroute === 1 ?
                
                <a class="flex f6 fw1" onClick={startFollowing}><PersonAddOutlinedIcon/><span className="ml2">unfollow {name}</span></a>:
                    // <button class="f6 button-reset ba b--black-10 pointer pv1 black-60 white" onClick={startFollowing}>+ Follow</button>
                    <a class="flex f6 fw1" onClick={startFollowing}><PersonAddOutlinedIcon/><span className="ml2">follow {name}</span></a>
            }
        </div>
    )
}
export default Followbtn
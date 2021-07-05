import { Divider } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React, { useState,useEffect } from 'react'
import Followbtn from '../../Follow/followbtn.jsx'

const SeverLink = 'https://guarded-anchorage-74785.herokuapp.com'

const FollowersTemp = ({follow_from}) =>{
  const [userDetail,setUserDt] = useState([])
  const [isLoggedIn,setisLoggedin] = useState([])

  useEffect(()=>{
    UserDetails()
    getLoggedInUser()
  })
      //GEt all user additional info
      const UserDetails = async()=>{
        const FetchAllDetails = await fetch(`${SeverLink}/Authentication/by_id/${follow_from}`)
          const response = await FetchAllDetails.json()
          if (response.profiler) {
              setUserDt(response.profiler)
            }
        }
        
     const getLoggedInUser = async()=>{
    const getLogginUser = await fetch(`${SeverLink}/Authentication/User/LoggedIn`,{
        headers:{token:localStorage.token}
    })
    const response = await getLogginUser.json()
    setisLoggedin(response.loggedIn)
}
console.log(userDetail)
return(
        <article className="center mv3 b--black-10">
            <main class="mw6 center">
            <article class="dt w-100 bb b--black-05 pb2 mt2" href="#0">
                 <a href={`${userDetail.username}.pal`}>
                 {
                    userDetail.profileimg ?
                      <Avatar size='large' src={userDetail.profileimg} />
                      :
                      <Avatar size='large' />
                  }
                  <div class="dtc v-mid pl3 tl">
                    <div class="f6 f5-ns fw4 lh-title f-name mv0 tl">{userDetail.fullname}</div>
                    {userDetail.profession ?
                      <span class="f6 fw4 mt0 mb0 f-name">#{userDetail.profession[0].skill}</span>
                      : null
                    }

                  </div>
                 </a>
        <div class="dtc v-mid">
        <div class="w-100 tr">
        {
        isLoggedIn === follow_from?
        null
        :
        <Followbtn userid={userDetail._id}/>
          }
          
        </div>
      </div>
    </article>
  </main>

        </article>
    )
}
export default FollowersTemp